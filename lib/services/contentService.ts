import { getDatabase } from "../mongodb"
import type { Content, CreateContentInput, UpdateContentInput } from "../models/Content"
import { ObjectId } from "mongodb"

export class ContentService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<Content>("content")
  }

  static async createContent(contentData: CreateContentInput): Promise<Content> {
    const collection = await this.getCollection()

    const newContent: Omit<Content, "_id"> = {
      ...contentData,
      status: contentData.status || "draft",
      publishDate: contentData.publishDate || new Date(),
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

    return await collection.find(query).sort({ publishDate: -1 }).toArray()
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
        $and: [
          { status: "published" },
          {
            $or: [
              { title: { $regex: searchTerm, $options: "i" } },
              { content: { $regex: searchTerm, $options: "i" } },
              { author: { $regex: searchTerm, $options: "i" } },
              { tags: { $in: [new RegExp(searchTerm, "i")] } },
            ],
          },
        ],
      })
      .sort({ publishDate: -1 })
      .toArray()
  }

  static async getContentByCategory(category: string): Promise<Content[]> {
    const collection = await this.getCollection()
    return await collection.find({ category, status: "published" }).sort({ publishDate: -1 }).toArray()
  }

  static async getContentByType(type: string): Promise<Content[]> {
    const collection = await this.getCollection()
    return await collection.find({ type, status: "published" }).sort({ publishDate: -1 }).toArray()
  }
}
