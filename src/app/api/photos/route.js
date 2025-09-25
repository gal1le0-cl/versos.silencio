export const runtime = 'edge';

export async function GET() {
  console.log("🚀 API /api/photos called");
  
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Verificar que las variables de entorno estén presentes
    console.log("📋 Environment check:", {
      cloudName: !!cloudName,
      apiKey: !!apiKey,
      apiSecret: !!apiSecret,
      cloudNameValue: cloudName // Para ver si está definido
    });

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("❌ Missing environment variables");
      return new Response(
        JSON.stringify({ 
          error: "Missing Cloudinary credentials",
          details: `Missing: ${!cloudName ? 'CLOUDINARY_CLOUD_NAME ' : ''}${!apiKey ? 'CLOUDINARY_API_KEY ' : ''}${!apiSecret ? 'CLOUDINARY_API_SECRET' : ''}`
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const searchUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;
    console.log("🔗 Search URL:", searchUrl);
    
    const searchParams = {
      expression: 'folder:collage',
      sort_by: [['public_id', 'asc']],
      max_results: 100
    };

    console.log("📦 Search params:", searchParams);

    const credentials = btoa(`${apiKey}:${apiSecret}`);
    console.log("🔐 Credentials created, making request...");

    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
    });

    console.log("📡 Response status:", response.status);
    console.log("📡 Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Cloudinary API error:", response.status, errorText);
      
      return new Response(
        JSON.stringify({ 
          error: `Cloudinary API error: ${response.status}`,
          details: errorText 
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await response.json();
    console.log("📊 Cloudinary result:", {
      total_count: result.total_count,
      resources_length: result.resources?.length || 0
    });
    
    const photos = result.resources.map((file, index) => ({
      id: index + 1,
      publicId: file.public_id,
      alt: file.filename || `Foto ${index + 1}`,
    }));

    console.log("✅ Returning photos:", photos.length);

    return new Response(JSON.stringify(photos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching photos:", error.message);
    console.error("❌ Error stack:", error.stack);
    return new Response(
      JSON.stringify({ 
        error: "Error fetching photos",
        details: error.message 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}