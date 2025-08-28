import { NextResponse } from "next/server"
import { ProjectService } from "@/lib/services/projectService"

export async function GET() {
  try {
    const stats = await ProjectService.getProjectStats()
    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Error fetching project stats:", error)
    return NextResponse.json({ error: "Failed to fetch project stats" }, { status: 500 })
  }
}
