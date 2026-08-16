export const runtime = "edge";

export async function GET() {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Comprobar variables de entorno
    if (!cloudName || !apiKey || !apiSecret) {
      console.error("❌ Faltan variables de Cloudinary:", {
        cloudName: !!cloudName,
        apiKey: !!apiKey,
        apiSecret: !!apiSecret,
      });

      return new Response(
        JSON.stringify({
          error: "Missing Cloudinary credentials",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const searchUrl =
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;

    const credentials = `${apiKey}:${apiSecret}`;

    // Codificación Base64 compatible con Workers
    const encodedCredentials = btoa(credentials);

    const response = await fetch(searchUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expression: "folder:collage",
        max_results: 100,
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error(
        "❌ Cloudinary API error:",
        response.status,
        responseText
      );

      return new Response(
        JSON.stringify({
          error: "Cloudinary API error",
          status: response.status,
          details: responseText,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    let result;

    try {
      result = JSON.parse(responseText);
    } catch (error) {
      console.error(
        "❌ Cloudinary devolvió una respuesta que no es JSON:",
        responseText
      );

      return new Response(
        JSON.stringify({
          error: "Invalid response from Cloudinary",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const resources = Array.isArray(result.resources)
      ? result.resources
      : [];

    const photos = resources.map((file, index) => ({
      id: index + 1,
      publicId: file.public_id,
      alt: file.filename || `Foto ${index + 1}`,
    }));

    return new Response(JSON.stringify(photos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (error) {
    console.error("❌ Error fetching photos:", error);

    return new Response(
      JSON.stringify({
        error: "Error fetching photos",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}