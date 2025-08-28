import { type NextRequest, NextResponse } from "next/server"
import { GalleryService } from "@/lib/services/galleryService"
import type { CreateGalleryItemInput } from "@/lib/models/Gallery"
import { requireAuth } from "@/lib/middleware/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const published = searchParams.get("published")

    let galleryItems

    if (search) {
      galleryItems = await GalleryService.searchGalleryItems(search)
    } else if (published === "true") {
      galleryItems = await GalleryService.getPublishedGalleryItems(category || undefined)
    } else {
      const filters = {
        ...(category && { category }),
        ...(status && { status }),
      }
      galleryItems = await GalleryService.getAllGalleryItems(filters)
    }

    return NextResponse.json({ galleryItems })
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 })
  }
}

export const POST = requireAuth(async (request: NextRequest) => {
  try {
    const itemData: CreateGalleryItemInput = await request.json()
    const user = (request as any).user

    // Validate required fields
    const requiredFields = ["title", "description", "category", "imageUrl"]
    for (const field of requiredFields) {
      if (!itemData[field as keyof CreateGalleryItemInput]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const galleryItem = await GalleryService.createGalleryItem(itemData, user.userId)

    return NextResponse.json({ galleryItem }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating gallery item:", error)
    return NextResponse.json({ error: error.message || "Failed to create gallery item" }, { status: 400 })
  }
})
