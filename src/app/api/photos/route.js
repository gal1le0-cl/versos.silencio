export const runtime = 'edge';

export async function GET() {
  try {
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
    
    const photos = result.resources.map((file, index) => ({
      id: index + 1,
      publicId: file.public_id,
      alt: file.filename || `Foto ${index + 1}`,
    }));

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