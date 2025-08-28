import { getDatabase } from "../mongodb"
import type { Project, CreateProjectInput, UpdateProjectInput } from "../models/Project"
import { ObjectId } from "mongodb"

export class ProjectService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<Project>("projects")
  }

  static async createProject(projectData: CreateProjectInput, createdBy: string): Promise<Project> {
    const collection = await this.getCollection()

    const newProject: Omit<Project, "_id"> = {
      ...projectData,
      createdBy: new ObjectId(createdBy),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newProject)
    const project = await collection.findOne({ _id: result.insertedId })

    if (!project) {
      throw new Error("Failed to create project")
    }

    return project
  }

  static async getProjectById(id: string): Promise<Project | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async getAllProjects(filters?: {
    status?: string
    priority?: string
    department?: string
    teamLead?: string
  }): Promise<Project[]> {
    const collection = await this.getCollection()
    const query: any = {}

    if (filters?.status) query.status = filters.status
    if (filters?.priority) query.priority = filters.priority
    if (filters?.department) query.department = filters.department
    if (filters?.teamLead) query.teamLead = filters.teamLead

    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  static async updateProject(id: string, updateData: UpdateProjectInput): Promise<Project | null> {
    const collection = await this.getCollection()

    const updateDoc = {
      ...updateData,
      updatedAt: new Date(),
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateDoc })

    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async deleteProject(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }

  static async searchProjects(searchTerm: string): Promise<Project[]> {
    const collection = await this.getCollection()

    return await collection
      .find({
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { department: { $regex: searchTerm, $options: "i" } },
          { teamLead: { $regex: searchTerm, $options: "i" } },
          { tags: { $in: [new RegExp(searchTerm, "i")] } },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray()
  }

  static async getProjectsByDepartment(department: string): Promise<Project[]> {
    const collection = await this.getCollection()
    return await collection.find({ department }).sort({ createdAt: -1 }).toArray()
  }

  static async getProjectsByStatus(status: string): Promise<Project[]> {
    const collection = await this.getCollection()
    return await collection.find({ status }).sort({ createdAt: -1 }).toArray()
  }

  static async getProjectStats(): Promise<{
    total: number
    active: number
    completed: number
    planning: number
    onHold: number
  }> {
    const collection = await this.getCollection()

    const [total, active, completed, planning, onHold] = await Promise.all([
      collection.countDocuments(),
      collection.countDocuments({ status: "active" }),
      collection.countDocuments({ status: "completed" }),
      collection.countDocuments({ status: "planning" }),
      collection.countDocuments({ status: "on-hold" }),
    ])

    return { total, active, completed, planning, onHold }
  }
}
