import type { ObjectId } from "mongodb"

export interface Content {
  _id?: ObjectId
  title: string
  type: "project" | "publication" | "research-area" | "achievement"
  status: "draft" | "published"
  content: string
  author: string
  category: string
  tags: string[]
  publishDate?: Date
  createdBy: ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface CreateContentInput {
  title: string
  type: "project" | "publication" | "research-area" | "achievement"
  status: "draft" | "published"
  content: string
  author: string
  category: string
  tags: string[]
  publishDate?: Date
}

export interface UpdateContentInput {
  title?: string
  type?: "project" | "publication" | "research-area" | "achievement"
  status?: "draft" | "published"
  content?: string
  author?: string
  category?: string
  tags?: string[]
  publishDate?: Date
}
