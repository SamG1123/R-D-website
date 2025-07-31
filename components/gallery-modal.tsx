"use client"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryItem {
  image: string
  title: string
  category: string
  description: string
}

interface GalleryModalProps {
  items: GalleryItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export function GalleryModal({ items, currentIndex, isOpen, onClose, onNext, onPrevious }: GalleryModalProps) {
  if (!isOpen || !items[currentIndex]) return null

  const currentItem = items[currentIndex]

  return (
    <div className="fixed inset-0 bg-blue-800/90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 font-bold"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
          onClick={onPrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
          onClick={onNext}
          disabled={currentIndex === items.length - 1}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Image */}
        <div className="bg-white rounded-lg overflow-hidden">
          <img
            src={currentItem.image || "/placeholder.svg"}
            alt={currentItem.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-mustard-100 text-mustard-800 px-2 py-1 rounded-full text-sm font-bold">
                {currentItem.category}
              </span>
              <span className="text-gray-500 text-sm font-medium">
                {currentIndex + 1} of {items.length}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">{currentItem.title}</h3>
            <p className="text-gray-600 font-medium">{currentItem.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
