import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { UserService } from "../services/userService"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string
    email: string
    role: string
  }
}

export async function authenticateToken(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    const user = await UserService.getUserById(decoded.userId)

    if (!user || user.status !== "active") {
      return null
    }

    return {
      userId: user._id!.toString(),
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    return null
  }
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    const user = await authenticateToken(request)

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }
    // Add user to request
    ;(request as AuthenticatedRequest).user = user

    return handler(request, ...args)
  }
}

export function requireAdmin(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    const user = await authenticateToken(request)

    if (!user || user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    }
    // Add user to request
    ;(request as AuthenticatedRequest).user = user

    return handler(request, ...args)
  }
}
