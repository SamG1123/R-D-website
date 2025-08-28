import { getDatabase } from "../mongodb"
import type { Content, CreateContentInput, UpdateContentInput } from "../models/Content"
import { ObjectId } from "mongodb"

export class ContentService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<Content>("content")
  }

  static async createContent(contentData: CreateContentInput, createdBy: string): Promise<Content> {
    const collection = await this.getCollection()

    const newContent: Omit<Content, "_id"> = {
      ...contentData,
      publishDate: contentData.status === "published" ? new Date() : undefined,
      createdBy: new ObjectId(createdBy),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newContent)
    const content = await collection.findOne({ _id: result.insertedId })

    if (!content) {
      throw new Error("Failed to create content")
    }

    return content
  }

  static async getContentById(id: string): Promise<Content | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async getAllContent(filters?: {
    type?: string
    status?: string
    category?: string
    author?: string
  }): Promise<Content[]> {
    const collection = await this.getCollection()
    const query: any = {}

    if (filters?.type) query.type = filters.type
    if (filters?.status) query.status = filters.status
    if (filters?.category) query.category = filters.category
    if (filters?.author) query.author = filters.author

    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  static async getPublishedContent(type?: string): Promise<Content[]> {
    const collection = await this.getCollection()
    const query: any = { status: "published" }
    if (type) query.type = type

    return await collection.find(query).sort({ publishDate: -1 }).toArray()
  }

  static async updateContent(id: string, updateData: UpdateContentInput): Promise<Content | null> {
    const collection = await this.getCollection()

    const updateDoc = {
      ...updateData,
      updatedAt: new Date(),
      ...(updateData.status === "published" && { publishDate: new Date() }),
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateDoc })
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async deleteContent(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }

  static async searchContent(searchTerm: string): Promise<Content[]> {
    const collection = await this.getCollection()

    return await collection
      .find({
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { content: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
          { author: { $regex: searchTerm, $options: "i" } },
          { tags: { $in: [new RegExp(searchTerm, "i")] } },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray()
  }

  static async getContentStats(): Promise<{
    total: number
    published: number
    draft: number
    byType: Record<string, number>
  }> {
    const collection = await this.getCollection()

    const [total, published, draft, typeStats] = await Promise.all([
      collection.countDocuments(),
      collection.countDocuments({ status: "published" }),
      collection.countDocuments({ status: "draft" }),
      collection
        .aggregate([{ $group: { _id: "$type", count: { $sum: 1 } } }, { $project: { type: "$_id", count: 1, _id: 0 } }])
        .toArray(),
    ])

    const byType = typeStats.reduce((acc: Record<string, number>, item: any) => {
      acc[item.type] = item.count
      return acc
    }, {})

    return { total, published, draft, byType }
  }
}
