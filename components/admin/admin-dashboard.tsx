"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, ImageIcon, Settings, BarChart3, Download, BookOpen } from "lucide-react"
import { UserManagement } from "./user-management"
import { ProjectManagement } from "./project-management"
import { ContentManagement } from "./content-management"
import { GalleryManagement } from "./gallery-management"
import { TeamManagement } from "./team-management"
import { SystemSettings } from "./system-settings"

interface AdminDashboardProps {
  onClose: () => void
}

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-mustard-600 rounded-lg">
                <Settings className="h-6 w-6 text-blue-800" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-800">Admin Dashboard</h1>
                <p className="text-gray-600">Research & Development Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button
                variant="outline"
                className="border-blue-800 text-blue-800 hover:bg-blue-50 bg-transparent"
                onClick={onClose}
              >
                Back to Website
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-7 bg-white border border-gray-200 p-1">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2 data-[state=active]:bg-mustard-100 data-[state=active]:text-mustard-800"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="flex items-center space-x-2 data-[state=active]:bg-mustard-100 data-[state=active]:text-mustard-800"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex items-center space-x-2 data-[state=active]:bg-mustard-100 data-[state=active]:text-mustard-800"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="flex items-center space-x-2 data-[state=active]:bg-mustard-100 data-[state=active]:text-mustard-800"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="flex items-center space-x-2 data-[state=active]:bg-mustard-100 data-[state=active]:text-mustard-800"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="flex items-center space-x-2 data-[state=active]:bg-mustard-100 data-[state=active]:text-mustard-800"
            >
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center space-x-2 data-[state=active]:bg-mustard-100 data-[state=active]:text-mustard-800"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stats Cards */}
              <Card className="border-l-4 border-l-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">127</div>
                  <p className="text-xs text-gray-500">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-mustard-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Research Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-mustard-600">25</div>
                  <p className="text-xs text-gray-500">4 active this month</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Publications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">156</div>
                  <p className="text-xs text-gray-500">8 published this month</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-mustard-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Gallery Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-mustard-600">89</div>
                  <p className="text-xs text-gray-500">15 added this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800">Recent Activity</CardTitle>
                  <CardDescription>Latest actions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "New user registered",
                        user: "Dr. Jane Smith",
                        time: "2 hours ago",
                        icon: <Users className="h-4 w-4 text-blue-800" />,
                      },
                      {
                        action: "Research project updated",
                        user: "Dr. Michael Chen",
                        time: "4 hours ago",
                        icon: <FileText className="h-4 w-4 text-mustard-600" />,
                      },
                      {
                        action: "Gallery image uploaded",
                        user: "Admin",
                        time: "6 hours ago",
                        icon: <ImageIcon className="h-4 w-4 text-blue-800" />,
                      },
                      {
                        action: "Publication added",
                        user: "Dr. Sarah Johnson",
                        time: "1 day ago",
                        icon: <BookOpen className="h-4 w-4 text-mustard-600" />,
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-white rounded-full">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">
                            by {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800">Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      className="h-20 flex-col bg-blue-800 hover:bg-blue-700 text-white"
                      onClick={() => setActiveTab("projects")}
                    >
                      <FileText className="h-6 w-6 mb-2" />
                      Manage Projects
                    </Button>
                    <Button
                      className="h-20 flex-col bg-mustard-600 hover:bg-mustard-700 text-blue-800"
                      onClick={() => setActiveTab("users")}
                    >
                      <Users className="h-6 w-6 mb-2" />
                      Add User
                    </Button>
                    <Button
                      className="h-20 flex-col bg-blue-800 hover:bg-blue-700 text-white"
                      onClick={() => setActiveTab("team")}
                    >
                      <Users className="h-6 w-6 mb-2" />
                      Add Faculty
                    </Button>
                    <Button
                      className="h-20 flex-col bg-mustard-600 hover:bg-mustard-700 text-blue-800"
                      onClick={() => setActiveTab("gallery")}
                    >
                      <ImageIcon className="h-6 w-6 mb-2" />
                      Upload Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <ProjectManagement />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <ContentManagement />
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <TeamManagement />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <GalleryManagement />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
