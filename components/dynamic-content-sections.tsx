"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Tag, ExternalLink, Award, BookOpen } from "lucide-react"

interface ContentItem {
  _id: string
  title: string
  type: string
  status: string
  content: string
  author: string
  category: string
  tags: string[]
  publishDate: string
}

interface Project {
  _id: string
  title: string
  description: string
  status: string
  priority: string
  startDate: string
  endDate: string
  budget: number
  teamLead: string
  department: string
  progress: number
  tags: string[]
}

export function DynamicContentSections() {
  const [researchAreas, setResearchAreas] = useState<ContentItem[]>([])
  const [publications, setPublications] = useState<ContentItem[]>([])
  const [achievements, setAchievements] = useState<ContentItem[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllContent()
  }, [])

  const fetchAllContent = async () => {
    try {
      setLoading(true)

      // Fetch research areas
      const researchResponse = await fetch("/api/content?type=research-area&status=published")
      const researchData = await researchResponse.json()
      setResearchAreas(researchData)

      // Fetch publications
      const publicationsResponse = await fetch("/api/content?type=publication&status=published")
      const publicationsData = await publicationsResponse.json()
      setPublications(publicationsData)

      // Fetch achievements
      const achievementsResponse = await fetch("/api/content?type=achievement&status=published")
      const achievementsData = await achievementsResponse.json()
      setAchievements(achievementsData)

      // Fetch projects
      const projectsResponse = await fetch("/api/projects?status=active")
      const projectsData = await projectsResponse.json()
      setProjects(projectsData.slice(0, 3)) // Show only first 3 projects
    } catch (error) {
      console.error("Error fetching content:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">Loading content...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Research Areas Section */}
      {researchAreas.length > 0 && (
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Research Areas</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our cutting-edge research domains and innovative solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchAreas.map((area) => (
                <Card key={area._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-blue-800">{area.title}</CardTitle>
                    <CardDescription className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {area.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-3">{area.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Current Projects Section */}
      {projects.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Current Projects</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our ongoing research initiatives and their impact
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-blue-800 text-lg">{project.title}</CardTitle>
                      <Badge variant={project.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                        {project.priority}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-500">
                      {project.department} • Led by {project.teamLead}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-800 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-sm text-gray-500">
                      <div className="flex items-center mb-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </div>
                      <div>Budget: ${project.budget.toLocaleString()}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50 bg-transparent">
                View All Projects
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Publications Section */}
      {publications.length > 0 && (
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Recent Publications</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay updated with our latest research findings and academic contributions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {publications.slice(0, 4).map((publication) => (
                <Card key={publication._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-6 w-6 text-blue-800 mt-1 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-blue-800 text-lg mb-2">{publication.title}</CardTitle>
                        <CardDescription className="flex items-center text-sm text-gray-500">
                          <User className="h-4 w-4 mr-1" />
                          {publication.author} • {new Date(publication.publishDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-3">{publication.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {publication.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50 bg-transparent">
                View All Publications
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Awards & Achievements</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Celebrating our recognition and milestones in research excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement) => (
                <Card
                  key={achievement._id}
                  className="hover:shadow-lg transition-shadow border-l-4 border-l-mustard-600"
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Award className="h-6 w-6 text-mustard-600 mt-1 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-blue-800 text-lg mb-2">{achievement.title}</CardTitle>
                        <CardDescription className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(achievement.publishDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{achievement.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {achievement.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-mustard-600 text-mustard-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
