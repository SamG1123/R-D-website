import { type NextRequest, NextResponse } from "next/server"
import { ProjectService } from "@/lib/services/projectService"
import type { CreateProjectInput } from "@/lib/models/Project"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")
    const department = searchParams.get("department")
    const teamLead = searchParams.get("teamLead")
    const search = searchParams.get("search")

    let projects

    if (search) {
      projects = await ProjectService.searchProjects(search)
    } else {
      const filters = {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(department && { department }),
        ...(teamLead && { teamLead }),
      }
      projects = await ProjectService.getAllProjects(filters)
    }

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData: CreateProjectInput & { createdBy: string } = await request.json()

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "status",
      "priority",
      "startDate",
      "endDate",
      "budget",
      "teamLead",
      "department",
      "fundingSource",
      "createdBy",
    ]
    for (const field of requiredFields) {
      if (!projectData[field as keyof typeof projectData]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Convert date strings to Date objects
    const processedData = {
      ...projectData,
      startDate: new Date(projectData.startDate),
      endDate: new Date(projectData.endDate),
    }

    const { createdBy, ...createData } = processedData
    const project = await ProjectService.createProject(createData, createdBy)

    return NextResponse.json({ project }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 400 })
  }
}
