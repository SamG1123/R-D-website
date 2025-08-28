import { NextResponse } from "next/server"
import { GalleryService } from "@/lib/services/galleryService"

export async function GET() {
  try {
    const categories = await GalleryService.getGalleryCategories()
    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Error fetching gallery categories:", error)
    return NextResponse.json({ error: "Failed to fetch gallery categories" }, { status: 500 })
  }
}
