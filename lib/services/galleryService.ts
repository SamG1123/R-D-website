import { getDatabase } from "../mongodb"
import type { GalleryItem, CreateGalleryItemInput, UpdateGalleryItemInput } from "../models/Gallery"
import { ObjectId } from "mongodb"

export class GalleryService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<GalleryItem>("gallery")
  }

  static async createGalleryItem(itemData: CreateGalleryItemInput, uploadedBy: string): Promise<GalleryItem> {
    const collection = await this.getCollection()

    const newItem: Omit<GalleryItem, "_id"> = {
      ...itemData,
      uploadedBy: new ObjectId(uploadedBy),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newItem)
    const item = await collection.findOne({ _id: result.insertedId })

    if (!item) {
      throw new Error("Failed to create gallery item")
    }

    return item
  }

  static async getGalleryItemById(id: string): Promise<GalleryItem | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async getAllGalleryItems(filters?: {
    category?: string
    status?: string
  }): Promise<GalleryItem[]> {
    const collection = await this.getCollection()
    const query: any = {}

    if (filters?.category) query.category = filters.category
    if (filters?.status) query.status = filters.status

    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  static async getPublishedGalleryItems(category?: string): Promise<GalleryItem[]> {
    const collection = await this.getCollection()
    const query: any = { status: "published" }
    if (category) query.category = category

    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  static async updateGalleryItem(id: string, updateData: UpdateGalleryItemInput): Promise<GalleryItem | null> {
    const collection = await this.getCollection()

    const updateDoc = {
      ...updateData,
      updatedAt: new Date(),
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateDoc })
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  static async deleteGalleryItem(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }

  static async searchGalleryItems(searchTerm: string): Promise<GalleryItem[]> {
    const collection = await this.getCollection()

    return await collection
      .find({
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
          { tags: { $in: [new RegExp(searchTerm, "i")] } },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray()
  }

  static async getGalleryCategories(): Promise<string[]> {
    const collection = await this.getCollection()
    return await collection.distinct("category", { status: "published" })
  }
}
