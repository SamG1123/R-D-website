import { type NextRequest, NextResponse } from "next/server"
import { ContentService } from "@/lib/services/contentService"
import type { CreateContentInput } from "@/lib/models/Content"
import { requireAuth } from "@/lib/middleware/auth"

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const author = searchParams.get("author")
    const search = searchParams.get("search")
    const published = searchParams.get("published")

    let content

    if (search) {
      content = await ContentService.searchContent(search)
    } else if (published === "true") {
      content = await ContentService.getPublishedContent(type || undefined)
    } else {
      const filters = {
        ...(type && { type }),
        ...(status && { status }),
        ...(category && { category }),
        ...(author && { author }),
      }
      content = await ContentService.getAllContent(filters)
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export const POST = requireAuth(async (request: NextRequest) => {
  try {
    const contentData: CreateContentInput = await request.json()
    const user = (request as any).user

    // Validate required fields
    const requiredFields = ["title", "type", "status", "content", "author", "category"]
    for (const field of requiredFields) {
      if (!contentData[field as keyof CreateContentInput]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const content = await ContentService.createContent(contentData, user.userId)

    return NextResponse.json({ content }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating content:", error)
    return NextResponse.json({ error: error.message || "Failed to create content" }, { status: 400 })
  }
})
