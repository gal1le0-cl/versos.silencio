export const runtime = 'edge';

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:collage")
      .sort_by("public_id", "asc")
      .max_results(100)
      .execute()
    
    const photos = result.resources.map((file, index) => ({
      id: index + 1,
      publicId: file.public_id,
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