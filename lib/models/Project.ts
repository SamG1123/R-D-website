import type { ObjectId } from "mongodb"

export interface Project {
  _id?: ObjectId
  title: string
  description: string
  status: "planning" | "active" | "completed" | "on-hold"
  priority: "low" | "medium" | "high" | "critical"
  startDate: Date
  endDate: Date
  budget: number
  teamLead: string
  teamMembers: string[]
  department: string
  fundingSource: string
  progress: number
  objectives: string[]
  deliverables: string[]
  tags: string[]
  createdBy: ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface CreateProjectInput {
  title: string
  description: string
  status: "planning" | "active" | "completed" | "on-hold"
  priority: "low" | "medium" | "high" | "critical"
  startDate: Date
  endDate: Date
  budget: number
  teamLead: string
  teamMembers: string[]
  department: string
  fundingSource: string
  progress: number
  objectives: string[]
  deliverables: string[]
  tags: string[]
}

export interface UpdateProjectInput {
  title?: string
  description?: string
  status?: "planning" | "active" | "completed" | "on-hold"
  priority?: "low" | "medium" | "high" | "critical"
  startDate?: Date
  endDate?: Date
  budget?: number
  teamLead?: string
  teamMembers?: string[]
  department?: string
  fundingSource?: string
  progress?: number
  objectives?: string[]
  deliverables?: string[]
  tags?: string[]
}
