import { type NextRequest, NextResponse } from "next/server"
import { TeamService } from "@/lib/services/teamService"
import type { CreateTeamMemberInput } from "@/lib/models/TeamMember"
import { requireAuth } from "@/lib/middleware/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const specialization = searchParams.get("specialization")
    const role = searchParams.get("role")
    const search = searchParams.get("search")
    const active = searchParams.get("active")

    let teamMembers

    if (search) {
      teamMembers = await TeamService.searchTeamMembers(search)
    } else if (active === "true") {
      teamMembers = await TeamService.getActiveTeamMembers()
    } else {
      const filters = {
        ...(status && { status }),
        ...(specialization && { specialization }),
        ...(role && { role }),
      }
      teamMembers = await TeamService.getAllTeamMembers(filters)
    }

    return NextResponse.json({ teamMembers })
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

export const POST = requireAuth(async (request: NextRequest) => {
  try {
    const memberData: CreateTeamMemberInput = await request.json()

    // Validate required fields
    const requiredFields = ["name", "role", "specialization", "email", "bio"]
    for (const field of requiredFields) {
      if (!memberData[field as keyof CreateTeamMemberInput]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const teamMember = await TeamService.createTeamMember(memberData)

    return NextResponse.json({ teamMember }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ error: error.message || "Failed to create team member" }, { status: 400 })
  }
})
