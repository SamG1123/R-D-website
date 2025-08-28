import { type NextRequest, NextResponse } from "next/server"
import { GalleryService } from "@/lib/services/galleryService"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")

    const filters = { category, status }
    Object.keys(filters).forEach((key) => filters[key] === null && delete filters[key])

    const galleryItems = await GalleryService.getAllGalleryItems(filters)
    return NextResponse.json(galleryItems)
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const itemData = await request.json()
    const item = await GalleryService.createGalleryItem(itemData)
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error("Error creating gallery item:", error)
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
  }
}
