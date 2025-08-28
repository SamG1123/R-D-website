import { getDatabase } from "../mongodb"
import type { TeamMember, CreateTeamMemberInput, UpdateTeamMemberInput } from "../models/TeamMember"
import { ObjectId } from "mongodb"

export class TeamService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<TeamMember>("team_members")
  }

  static async createTeamMember(memberData: CreateTeamMemberInput): Promise<TeamMember> {
    const collection = await this.getCollection()

    // Check if team member already exists
    const existingMember = await collection.findOne({ email: memberData.email })

    if (existingMember) {
      throw new Error("Team member with this email already exists")
    }

    const newMember: Omit<TeamMember, "_id"> = {
      ...memberData,
      status: memberData.status || "active",
      publications: memberData.publications || [],
      achievements: memberData.achievements || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newMember)
    const member = await collection.findOne({ _id: result.insertedId })

    if (!member) {
      throw new Error("Failed to create team member")
    }

    return member
  }

  static async getTeamMemberById(id: string): Promise<TeamMember | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async getAllTeamMembers(filters?: { status?: string; specialization?: string }): Promise<TeamMember[]> {
    const collection = await this.getCollection()
    const query: any = {}

    if (filters?.status) query.status = filters.status
    if (filters?.specialization) query.specialization = filters.specialization

    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  static async getActiveTeamMembers(): Promise<TeamMember[]> {
    const collection = await this.getCollection()
    return await collection.find({ status: "active" }).sort({ createdAt: -1 }).toArray()
  }

  static async updateTeamMember(id: string, updateData: UpdateTeamMemberInput): Promise<TeamMember | null> {
    const collection = await this.getCollection()

    const updateDoc = {
      ...updateData,
      updatedAt: new Date(),
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateDoc })

    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async deleteTeamMember(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }

  static async searchTeamMembers(searchTerm: string): Promise<TeamMember[]> {
    const collection = await this.getCollection()

    return await collection
      .find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { role: { $regex: searchTerm, $options: "i" } },
          { specialization: { $regex: searchTerm, $options: "i" } },
          { email: { $regex: searchTerm, $options: "i" } },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray()
  }

  static async getTeamMemberByEmail(email: string): Promise<TeamMember | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ email })
  }
}
