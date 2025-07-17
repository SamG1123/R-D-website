"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GalleryModal } from "./gallery-modal"

interface GalleryItem {
  image: string
  title: string
  category: string
  description: string
}

const galleryItems: GalleryItem[] = [
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "AI Research Laboratory",
    category: "Laboratories",
    description:
      "State-of-the-art computing facility equipped with high-performance GPUs and specialized hardware for artificial intelligence research, machine learning model training, and neural network development.",
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "Biomedical Engineering Lab",
    category: "Laboratories",
    description:
      "Advanced biomedical research facility featuring cutting-edge equipment for medical device development, tissue engineering, and biocompatibility testing.",
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "Research Team Collaboration",
    category: "Research Activities",
    description:
      "Interdisciplinary team of researchers, faculty, and graduate students collaborating on breakthrough sustainable energy solutions and environmental technologies.",
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "Annual Research Symposium",
    category: "Events",
    description:
      "Our flagship annual event where researchers present their latest findings, breakthrough discoveries, and innovative solutions to the broader academic community.",
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "Innovation Award Ceremony",
    category: "Awards",
    description:
      "Recognition ceremony celebrating excellence in research and development, honoring outstanding contributions to scientific advancement and technological innovation.",
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "Quantum Computing Setup",
    category: "Laboratories",
    description:
      "Cutting-edge quantum research infrastructure including quantum processors, cryogenic systems, and specialized measurement equipment for quantum algorithm development.",
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "Student Research Presentation",
    category: "Research Activities",
    description:
      "Graduate students and PhD candidates presenting their research findings, thesis work, and innovative solutions at our monthly research showcase.",
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "International Conference",
    category: "Events",
    description:
      "Hosting distinguished researchers, scientists, and academics from around the world for knowledge exchange and collaborative research discussions.",
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "Clean Energy Lab",
    category: "Laboratories",
    description:
      "Renewable energy research and testing facility focusing on solar cell development, wind energy optimization, and energy storage solutions.",
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "Data Science Workshop",
    category: "Research Activities",
    description:
      "Hands-on workshop sessions where researchers learn advanced data analysis techniques, machine learning algorithms, and statistical modeling methods.",
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "Industry Partnership Meeting",
    category: "Events",
    description:
      "Collaborative meetings with industry partners to discuss technology transfer, commercialization opportunities, and real-world applications of research.",
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    title: "Materials Science Lab",
    category: "Laboratories",
    description:
      "Advanced materials characterization facility with electron microscopes, X-ray diffraction equipment, and nanomaterial synthesis capabilities.",
  },
]

export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = ["All", "Laboratories", "Research Activities", "Events", "Awards"]

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

  return (
    <>
      {/* Gallery Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className={`${
              selectedCategory === category
                ? "border-orange-500 text-orange-500 bg-orange-50"
                : "border-slate-300 text-slate-600 hover:bg-slate-100"
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
            key={index}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block bg-orange-500 px-2 py-1 rounded-full text-xs font-medium mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        items={filteredItems}
        currentIndex={currentImageIndex}
        isOpen={modalOpen}
        onClose={closeModal}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </>
  )
}
