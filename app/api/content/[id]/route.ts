import { type NextRequest, NextResponse } from "next/server"
import { ContentService } from "@/lib/services/contentService"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const content = await ContentService.getContentById(params.id)
    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }
    return NextResponse.json(content)
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updateData = await request.json()
    const content = await ContentService.updateContent(params.id, updateData)
    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }
    return NextResponse.json(content)
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await ContentService.deleteContent(params.id)
    if (!success) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Content deleted successfully" })
  } catch (error) {
    console.error("Error deleting content:", error)
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 })
  }
}
