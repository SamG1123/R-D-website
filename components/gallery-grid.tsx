"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GalleryModal } from "./gallery-modal"

interface GalleryItem {
  _id: string
  title: string
  description: string
  category: string
  imageUrl: string
  status: string
  tags: string[]
}

export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGalleryData()
  }, [])

  const fetchGalleryData = async () => {
    try {
      setLoading(true)

      // Fetch gallery items
      const itemsResponse = await fetch("/api/gallery?status=published")
      const items = await itemsResponse.json()
      setGalleryItems(items)

      // Fetch categories
      const categoriesResponse = await fetch("/api/gallery/categories")
      const cats = await categoriesResponse.json()
      setCategories(["All", ...cats])
    } catch (error) {
      console.error("Error fetching gallery data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredImages =
    selectedCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Research Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Loading gallery...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Research Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our state-of-the-art facilities, research activities, and academic achievements
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-blue-800 hover:bg-blue-700 text-white"
                  : "border-blue-800 text-blue-800 hover:bg-blue-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item) => (
            <div
              key={item._id}
              className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => setSelectedImage(item)}
            >
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-blue-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                <div className="mt-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No images found in this category.</p>
          </div>
        )}

        {/* Gallery Modal */}
        <GalleryModal image={selectedImage} isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} />
      </div>
    </div>
  )
}
