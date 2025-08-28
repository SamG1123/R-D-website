import type { ObjectId } from "mongodb"

export interface TeamMember {
  _id?: ObjectId
  name: string
  role: string
  specialization: string
  email: string
  bio: string
  profileImage?: string
  status: "active" | "inactive"
  socialLinks?: {
    linkedin?: string
    twitter?: string
    researchGate?: string
    googleScholar?: string
  }
  publications: string[]
  achievements: string[]
  createdAt: Date
  updatedAt: Date
}

export interface CreateTeamMemberInput {
  name: string
  role: string
  specialization: string
  email: string
  bio: string
  profileImage?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    researchGate?: string
    googleScholar?: string
  }
  publications?: string[]
  achievements?: string[]
}

export interface UpdateTeamMemberInput {
  name?: string
  role?: string
  specialization?: string
  email?: string
  bio?: string
  profileImage?: string
  status?: "active" | "inactive"
  socialLinks?: {
    linkedin?: string
    twitter?: string
    researchGate?: string
    googleScholar?: string
  }
  publications?: string[]
  achievements?: string[]
}
