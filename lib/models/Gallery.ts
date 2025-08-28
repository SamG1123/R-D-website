import type { ObjectId } from "mongodb"

export interface GalleryItem {
  _id?: ObjectId
  title: string
  description: string
  category: string
  imageUrl: string
  thumbnailUrl?: string
  status: "draft" | "published"
  tags: string[]
  uploadedBy: ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface CreateGalleryItemInput {
  title: string
  description: string
  category: string
  imageUrl: string
  thumbnailUrl?: string
  status: "draft" | "published"
  tags: string[]
}

export interface UpdateGalleryItemInput {
  title?: string
  description?: string
  category?: string
  imageUrl?: string
  thumbnailUrl?: string
  status?: "draft" | "published"
  tags?: string[]
}
