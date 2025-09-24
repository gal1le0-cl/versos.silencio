import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    // 👇 Ajusta "collage" al nombre de la carpeta donde tengas las fotos
    const result = await cloudinary.search
      .expression("folder:collage") // todas las imágenes dentro de /collage
      .sort_by("public_id", "asc")
      .max_results(100)
      .execute()

    const photos = result.resources.map((file, index) => ({
      id: index + 1,
      publicId: file.public_id, // ej: "collage/DSCN5904_dsxbyl"
      alt: file.filename || `Foto ${index + 1}`,
    }))

    return new Response(JSON.stringify(photos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("❌ Error fetching photos:", error)
    return new Response(
      JSON.stringify({ error: "Error fetching photos" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
