import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  firstName: string
  lastName: string
  usn: string
  email: string
  phone: string
  password: string
  role: "admin" | "member"
  department: string
  status: "active" | "inactive"
  lastLogin?: Date
  joinDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserInput {
  firstName: string
  lastName: string
  usn: string
  email: string
  phone: string
  password: string
  role: "admin" | "member"
  department: string
}

export interface UpdateUserInput {
  firstName?: string
  lastName?: string
  usn?: string
  email?: string
  phone?: string
  role?: "admin" | "member"
  department?: string
  status?: "active" | "inactive"
}
