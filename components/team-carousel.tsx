"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  specialization: string
  image?: string
  email?: string
  bio?: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Sarah Johnson",
    role: "Director of R&D",
    specialization: "Artificial Intelligence",
    email: "s.johnson@college.edu",
    bio: "Leading AI research with 15+ years of experience in machine learning and neural networks.",
  },
  {
    name: "Dr. Michael Chen",
    role: "Senior Research Scientist",
    specialization: "Biomedical Engineering",
    email: "m.chen@college.edu",
    bio: "Expert in medical device development and tissue engineering with 20+ publications.",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Principal Investigator",
    specialization: "Sustainable Technology",
    email: "e.rodriguez@college.edu",
    bio: "Pioneering research in renewable energy systems and environmental sustainability.",
  },
  {
    name: "Dr. David Kim",
    role: "Research Professor",
    specialization: "Data Science",
    email: "d.kim@college.edu",
    bio: "Specializing in big data analytics and predictive modeling for complex systems.",
  },
  {
    name: "Dr. Lisa Wang",
    role: "Associate Research Director",
    specialization: "Quantum Computing",
    email: "l.wang@college.edu",
    bio: "Leading quantum algorithm development and quantum information processing research.",
  },
  {
    name: "Dr. James Thompson",
    role: "Senior Researcher",
    specialization: "Cybersecurity",
    email: "j.thompson@college.edu",
    bio: "Expert in cryptography and digital security with focus on blockchain technologies.",
  },
  {
    name: "Dr. Maria Garcia",
    role: "Research Scientist",
    specialization: "Materials Science",
    email: "m.garcia@college.edu",
    bio: "Developing advanced nanomaterials and conducting cutting-edge materials characterization.",
  },
  {
    name: "Dr. Robert Lee",
    role: "Principal Researcher",
    specialization: "Robotics & Automation",
    email: "r.lee@college.edu",
    bio: "Advancing autonomous systems and human-robot interaction technologies.",
  },
]

export function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [itemsPerView, setItemsPerView] = useState(3)

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-rotation
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(teamMembers.length / itemsPerView))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, itemsPerView])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(teamMembers.length / itemsPerView))
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(teamMembers.length / itemsPerView)) % Math.ceil(teamMembers.length / itemsPerView),
    )
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const getCurrentMembers = () => {
    const startIndex = currentIndex * itemsPerView
    return teamMembers.slice(startIndex, startIndex + itemsPerView)
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {getCurrentMembers().map((member, index) => (
              <Card
                key={`${currentIndex}-${index}`}
                className="text-center hover:shadow-xl transition-all duration-300 bg-white transform hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-bold text-blue-800 mb-1 text-lg">{member.name}</h3>
                  <p className="text-mustard-600 font-bold text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm font-medium mb-3">{member.specialization}</p>
                  {member.bio && (
                    <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-3">{member.bio}</p>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-blue-800 hover:text-mustard-600 text-xs font-medium transition-colors"
                    >
                      {member.email}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 shadow-lg border text-blue-800 hover:text-mustard-600"
        onClick={prevSlide}
        disabled={teamMembers.length <= itemsPerView}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 shadow-lg border text-blue-800 hover:text-mustard-600"
        onClick={nextSlide}
        disabled={teamMembers.length <= itemsPerView}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      {Math.ceil(teamMembers.length / itemsPerView) > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(teamMembers.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-mustard-600" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Auto-play Toggle */}
      <div className="flex justify-center mt-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-blue-800 font-medium"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          {isAutoPlaying ? "Pause Auto-rotation" : "Resume Auto-rotation"}
        </Button>
      </div>
    </div>
  )
}
