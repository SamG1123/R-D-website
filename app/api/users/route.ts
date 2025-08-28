import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/services/userService"
import type { CreateUserInput } from "@/lib/models/User"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")
    const status = searchParams.get("status")
    const department = searchParams.get("department")
    const search = searchParams.get("search")

    let users

    if (search) {
      users = await UserService.searchUsers(search)
    } else {
      const filters = {
        ...(role && { role }),
        ...(status && { status }),
        ...(department && { department }),
      }
      users = await UserService.getAllUsers(filters)
    }

    // Remove password from response
    const safeUsers = users.map(({ password, ...user }) => user)

    return NextResponse.json({ users: safeUsers })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData: CreateUserInput = await request.json()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "usn", "email", "phone", "password", "role", "department"]
    for (const field of requiredFields) {
      if (!userData[field as keyof CreateUserInput]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userData.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const user = await UserService.createUser(userData)

    // Remove password from response
    const { password, ...safeUser } = user

    return NextResponse.json({ user: safeUser }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 400 })
  }
}
