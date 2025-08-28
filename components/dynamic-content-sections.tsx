"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, BookOpen, Award, FileText } from "lucide-react"
import { useApi } from "@/lib/hooks/useApi"

interface ContentItem {
  _id: string
  title: string
  type: string
  content: string
  author: string
  category: string
  publishDate: string
  tags: string[]
}

interface Project {
  _id: string
  title: string
  description: string
  status: string
  progress: number
  teamLead: string
  department: string
  budget: number
}

export function DynamicContentSections() {
  // Fetch published content
  const { data: contentData, loading: contentLoading } = useApi<{ content: ContentItem[] }>(
    "/api/content?published=true",
  )

  // Fetch active projects
  const { data: projectsData, loading: projectsLoading } = useApi<{ projects: Project[] }>(
    "/api/projects?status=active",
  )

  const content = contentData?.content || []
  const projects = projectsData?.projects || []

  // Group content by type
  const publications = content.filter((item) => item.type === "publication").slice(0, 3)
  const achievements = content.filter((item) => item.type === "achievement").slice(0, 3)
  const researchAreas = content.filter((item) => item.type === "research-area").slice(0, 6)

  // Get current projects (limit to 4)
  const currentProjects = projects.slice(0, 4)

  return (
    <>
      {/* Research Areas Section */}
      <section id="research" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Research Areas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-medium">
              Our multidisciplinary approach spans across various fields of study, driving innovation and discovery in
              key areas of research.
            </p>
          </div>

          {contentLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-blue-800" />
            </div>
          ) : researchAreas.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchAreas.map((area) => (
                <Card
                  key={area._id}
                  className="hover:shadow-xl transition-shadow border-l-4 border-l-mustard-600 bg-white"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-mustard-600" />
                      <CardTitle className="text-blue-800 font-bold">{area.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 font-medium">
                      {area.content.substring(0, 150)}...
                    </CardDescription>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {area.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-mustard-100 text-mustard-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No research areas available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Current Projects Section */}
      <section id="projects" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Current Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-medium">
              Discover our ongoing research projects that are shaping the future and addressing real-world challenges.
            </p>
          </div>

          {projectsLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-blue-800" />
            </div>
          ) : currentProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {currentProjects.map((project) => (
                <Card key={project._id} className="hover:shadow-xl transition-shadow bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-blue-800 font-bold">{project.title}</CardTitle>
                      <span className="bg-mustard-100 text-mustard-800 px-2 py-1 rounded-full text-sm font-bold">
                        {project.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4 font-medium">{project.description}</CardDescription>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 font-medium">Progress</span>
                        <span className="text-blue-800 font-bold">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-mustard-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600 font-medium">
                        <strong className="text-blue-800">Lead:</strong> {project.teamLead}
                      </p>
                      <p className="text-gray-600 font-medium">
                        <strong className="text-blue-800">Budget:</strong> ${project.budget.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No active projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Publications & Achievements Section */}
      <section id="publications" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Recent Publications & Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-medium">
              Our research contributions to the academic community and industry recognition.
            </p>
          </div>

          {contentLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-blue-800" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Recent Publications */}
              <Card className="border-l-4 border-l-mustard-600 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800 font-bold flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Recent Publications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {publications.length > 0 ? (
                    <div className="space-y-3">
                      {publications.map((pub) => (
                        <div key={pub._id} className="border-b pb-2">
                          <p className="font-bold text-sm text-blue-800">{pub.title}</p>
                          <p className="text-xs text-gray-600 font-medium">
                            {pub.author} • {new Date(pub.publishDate).getFullYear()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No publications available</p>
                  )}
                </CardContent>
              </Card>

              {/* Awards & Recognition */}
              <Card className="border-l-4 border-l-mustard-600 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800 font-bold flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Awards & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {achievements.length > 0 ? (
                    <div className="space-y-3">
                      {achievements.map((achievement) => (
                        <div key={achievement._id} className="border-b pb-2">
                          <p className="font-bold text-sm text-blue-800">{achievement.title}</p>
                          <p className="text-xs text-gray-600 font-medium">
                            {achievement.category} • {new Date(achievement.publishDate).getFullYear()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No achievements available</p>
                  )}
                </CardContent>
              </Card>

              {/* Research Impact */}
              <Card className="border-l-4 border-l-mustard-600 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800 font-bold">Research Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-mustard-600">{content.length}</div>
                      <div className="text-sm text-gray-600 font-medium">Total Publications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-mustard-600">{projects.length}</div>
                      <div className="text-sm text-gray-600 font-medium">Active Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-mustard-600">
                        ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Research Funding</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
