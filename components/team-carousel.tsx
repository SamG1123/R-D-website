"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Mail, Award, BookOpen } from "lucide-react"

interface TeamMember {
  _id: string
  name: string
  role: string
  specialization: string
  email: string
  bio: string
  status: string
  publications: string[]
  achievements: string[]
}

export function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/team?status=active")
      const members = await response.json()
      setTeamMembers(members)
    } catch (error) {
      console.error("Error fetching team members:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length)
  }

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Research Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Loading team members...</p>
          </div>
        </div>
      </div>
    )
  }

  if (teamMembers.length === 0) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Research Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">No team members found.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Research Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our dedicated researchers and faculty members driving innovation and discovery
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Team Member Card */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Profile Image Placeholder */}
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="text-4xl font-bold text-blue-800">
                    {teamMembers[currentIndex].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{teamMembers[currentIndex].name}</h3>
                <p className="text-mustard-600 font-semibold mb-2">{teamMembers[currentIndex].role}</p>
                <p className="text-gray-600 mb-4">
                  <strong>Specialization:</strong> {teamMembers[currentIndex].specialization}
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">{teamMembers[currentIndex].bio}</p>

                {/* Contact */}
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <Mail className="h-4 w-4 text-blue-800 mr-2" />
                  <a
                    href={`mailto:${teamMembers[currentIndex].email}`}
                    className="text-blue-800 hover:text-blue-600 transition-colors"
                  >
                    {teamMembers[currentIndex].email}
                  </a>
                </div>

                {/* Publications */}
                {teamMembers[currentIndex].publications.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-center md:justify-start mb-2">
                      <BookOpen className="h-4 w-4 text-blue-800 mr-2" />
                      <span className="font-semibold text-blue-800">Recent Publications:</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {teamMembers[currentIndex].publications.slice(0, 3).map((pub, index) => (
                        <li key={index}>• {pub}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {teamMembers[currentIndex].achievements.length > 0 && (
                  <div>
                    <div className="flex items-center justify-center md:justify-start mb-2">
                      <Award className="h-4 w-4 text-mustard-600 mr-2" />
                      <span className="font-semibold text-blue-800">Achievements:</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {teamMembers[currentIndex].achievements.slice(0, 2).map((achievement, index) => (
                        <li key={index}>• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          {teamMembers.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 border-blue-800 text-blue-800"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 border-blue-800 text-blue-800"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Dots Indicator */}
          {teamMembers.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-800" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
