"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GalleryModal } from "./gallery-modal"
import {useApi} from "@/lib/hooks/useApi"
import {Loader2} from "lucide-react"

interface GalleryItem {
  _id: string
  title: string
  description: string

  category: string
  imageUrl: string
  thumbnailUrl?: string
  status: string
  tags: string[]
  createdAt: string
}


export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Fetch published gallery items
  const { data: galleryData, loading: galleryLoading } = useApi<{ galleryItems: GalleryItem[] }>(
    "/api/gallery?published=true",
  )

  // Fetch categories
  const { data: categoriesData, loading: categoriesLoading } = useApi<{ categories: string[] }>(
    "/api/gallery/categories",
  )

  const galleryItems = galleryData?.galleryItems || []
  const dbCategories = categoriesData?.categories || []
  const categories = ["All", ...dbCategories]


  const filteredItems =
    selectedCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  if (galleryLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-800" />
      </div>
    )
  }

  if (galleryItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No gallery items available at the moment.</p>
      </div>
    )
  }

  return (
    <>
      {/* Gallery Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className={`font-bold ${
              selectedCategory === category
                ? "border-mustard-600 text-mustard-600 bg-mustard-50"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <Card
            key = {item._id}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
            onClick={() => openModal(index)}
          >
            <div className="relative overflow-hidden">
              <img
                src={item.thumbnailUrl || item.imageUrl || "/placeholder-image.png"}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-800/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block bg-mustard-600 px-2 py-1 rounded-full text-xs font-bold mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2 font-medium">{item.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        items={filteredItems.map((item) => ({
          image: item.imageUrl,
          title: item.title,
          category: item.category,
          description: item.description,
        }))}
        currentIndex={currentImageIndex}
        isOpen={modalOpen}
        onClose={closeModal}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </>
  )
}
