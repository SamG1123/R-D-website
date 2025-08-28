import { type NextRequest, NextResponse } from "next/server"
import { ContentService } from "@/lib/services/contentService"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const author = searchParams.get("author")

    const filters = { type, status, category, author }
    Object.keys(filters).forEach((key) => filters[key] === null && delete filters[key])

    const content = await ContentService.getAllContent(filters)
    return NextResponse.json(content)
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentData = await request.json()
    const content = await ContentService.createContent(contentData)
    return NextResponse.json(content, { status: 201 })
  } catch (error) {
    console.error("Error creating content:", error)
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 })
  }
}
