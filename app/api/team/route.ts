import { type NextRequest, NextResponse } from "next/server"
import { TeamService } from "@/lib/services/teamService"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const specialization = searchParams.get("specialization")

    const filters = { status, specialization }
    Object.keys(filters).forEach((key) => filters[key] === null && delete filters[key])

    const teamMembers = await TeamService.getAllTeamMembers(filters)
    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const memberData = await request.json()
    const member = await TeamService.createTeamMember(memberData)
    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}
