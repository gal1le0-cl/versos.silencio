// Detectar si estamos en producción (Cloudflare) o desarrollo
const isProduction = process.env.NODE_ENV === 'production';

// Solo usar Edge Runtime en producción
export const runtime = isProduction ? 'edge' : 'nodejs';

// Función para desarrollo (Node.js Runtime)
async function getPhotosNodeJS() {
  const { v2: cloudinary } = await import('cloudinary');
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.search
    .expression("folder:collage")
    .sort_by("public_id", "asc")
    .max_results(100)
    .execute();

  return result.resources.map((file, index) => ({
    id: index + 1,
    publicId: file.public_id,
    alt: file.filename || `Foto ${index + 1}`,
  }));
}

// Función para producción (Edge Runtime)
async function getPhotosEdge() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const searchUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;
  
  const searchParams = {
    expression: 'folder:collage',
    sort_by: [['public_id', 'asc']],
    max_results: 100
  };

  const credentials = btoa(`${apiKey}:${apiSecret}`);

  const response = await fetch(searchUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchParams),
  });

  if (!response.ok) {
    throw new Error(`Cloudinary API error: ${response.status}`);
  }

  const result = await response.json();
  
  return result.resources.map((file, index) => ({
    id: index + 1,
    publicId: file.public_id,
    alt: file.filename || `Foto ${index + 1}`,
  }));
}

export async function GET() {
  try {
    const photos = isProduction ? await getPhotosEdge() : await getPhotosNodeJS();
    
    return new Response(JSON.stringify(photos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching photos:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching photos" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}