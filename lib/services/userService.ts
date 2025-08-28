import { getDatabase } from "../mongodb"
import type { User, CreateUserInput, UpdateUserInput } from "../models/User"
import { ObjectId } from "mongodb"

export class UserService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<User>("users")
  }

  static async createUser(userData: CreateUserInput): Promise<User> {
    const collection = await this.getCollection()

    // Check if user already exists
    const existingUser = await collection.findOne({
      $or: [{ email: userData.email }, { usn: userData.usn }],
    })

    if (existingUser) {
      throw new Error("User with this email or USN already exists")
    }

    const newUser: Omit<User, "_id"> = {
      ...userData,
      password: userData.password, // Store password as plain text
      status: "active",
      joinDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newUser)
    const user = await collection.findOne({ _id: result.insertedId })

    if (!user) {
      throw new Error("Failed to create user")
    }

    return user
  }

  static async getUserById(id: string): Promise<User | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ email })
  }

  static async getAllUsers(filters?: { role?: string; status?: string; department?: string }): Promise<User[]> {
    const collection = await this.getCollection()
    const query: any = {}

    if (filters?.role) query.role = filters.role
    if (filters?.status) query.status = filters.status
    if (filters?.department) query.department = filters.department

    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  static async updateUser(id: string, updateData: UpdateUserInput): Promise<User | null> {
    const collection = await this.getCollection()

    const updateDoc = {
      ...updateData,
      updatedAt: new Date(),
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateDoc })

    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async deleteUser(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }

  static async updateLastLogin(id: string): Promise<void> {
    const collection = await this.getCollection()
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { lastLogin: new Date(), updatedAt: new Date() } })
  }

  static async authenticateUser(email: string, password: string): Promise<User | null> {
    const collection = await this.getCollection()
    const user = await collection.findOne({ email, status: "active" })

    if (!user) {
      return null
    }

    // Direct password comparison (plain text)
    if (password !== user.password) {
      return null
    }

    // Update last login
    await this.updateLastLogin(user._id!.toString())

    return user
  }

  static async searchUsers(searchTerm: string): Promise<User[]> {
    const collection = await this.getCollection()

    return await collection
      .find({
        $or: [
          { firstName: { $regex: searchTerm, $options: "i" } },
          { lastName: { $regex: searchTerm, $options: "i" } },
          { email: { $regex: searchTerm, $options: "i" } },
          { usn: { $regex: searchTerm, $options: "i" } },
          { department: { $regex: searchTerm, $options: "i" } },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray()
  }
}
