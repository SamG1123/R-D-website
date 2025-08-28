"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Eye, FileText, Save, X } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  status: "planning" | "active" | "completed" | "on-hold"
  priority: "low" | "medium" | "high" | "critical"
  startDate: string
  endDate: string
  budget: number
  teamLead: string
  teamMembers: string[]
  department: string
  fundingSource: string
  progress: number
  objectives: string[]
  deliverables: string[]
  tags: string[]
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Healthcare Diagnostics",
    description:
      "Developing machine learning models for early disease detection and diagnosis using medical imaging and patient data.",
    status: "active",
    priority: "high",
    startDate: "2024-01-15",
    endDate: "2025-06-30",
    budget: 250000,
    teamLead: "Dr. Sarah Johnson",
    teamMembers: ["Dr. Michael Chen", "Dr. Emily Rodriguez", "John Smith", "Jane Doe"],
    department: "AI Research",
    fundingSource: "National Science Foundation",
    progress: 65,
    objectives: [
      "Develop ML models for medical imaging analysis",
      "Create patient data processing pipeline",
      "Validate models with clinical trials",
    ],
    deliverables: ["Research paper publication", "Working prototype system", "Clinical validation report"],
    tags: ["AI", "Healthcare", "Machine Learning", "Medical Imaging"],
  },
  {
    id: 2,
    title: "Smart Campus Initiative",
    description:
      "Implementing IoT solutions for energy management, security, and campus automation to create a sustainable smart campus environment.",
    status: "active",
    priority: "medium",
    startDate: "2023-09-01",
    endDate: "2024-12-31",
    budget: 180000,
    teamLead: "Dr. David Kim",
    teamMembers: ["Dr. Lisa Wang", "Alex Johnson", "Maria Garcia"],
    department: "Sustainable Technology",
    fundingSource: "Department of Energy",
    progress: 75,
    objectives: [
      "Install IoT sensors across campus",
      "Develop energy management system",
      "Implement automated controls",
    ],
    deliverables: ["IoT sensor network", "Energy management dashboard", "Automation control system"],
    tags: ["IoT", "Smart Campus", "Energy", "Automation"],
  },
  {
    id: 3,
    title: "Quantum Computing Research",
    description:
      "Exploring quantum algorithms and their practical applications in cryptography and optimization problems.",
    status: "planning",
    priority: "critical",
    startDate: "2024-03-01",
    endDate: "2026-02-28",
    budget: 500000,
    teamLead: "Dr. Robert Lee",
    teamMembers: ["Dr. James Thompson", "Dr. Maria Garcia"],
    department: "Computer Science",
    fundingSource: "IBM Research Grant",
    progress: 15,
    objectives: ["Develop quantum algorithms", "Build quantum simulation environment", "Test practical applications"],
    deliverables: ["Quantum algorithm library", "Simulation platform", "Research publications"],
    tags: ["Quantum Computing", "Algorithms", "Cryptography"],
  },
]

export function ProjectManagement() {
  const [projects, setProjects] = useState(mockProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddProject, setShowAddProject] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      case "on-hold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
  }

  const handleSaveProject = () => {
    if (editingProject) {
      setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? editingProject : p)))
      setEditingProject(null)
    }
  }

  const handleDeleteProject = (projectId: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-800">Project Management</h2>
          <p className="text-gray-600">Manage all research projects and their details</p>
        </div>
        <Button
          className="bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold"
          onClick={() => setShowAddProject(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">Projects ({filteredProjects.length})</CardTitle>
          <CardDescription>Comprehensive project overview and management</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Team Lead</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <FileText className="h-4 w-4 text-blue-800" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{project.title}</p>
                        <p className="text-sm text-gray-500">{project.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-mustard-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-500">{project.progress}%</span>
                  </TableCell>
                  <TableCell>{project.teamLead}</TableCell>
                  <TableCell>${project.budget.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-800 hover:text-blue-700"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-blue-800">Edit Project</CardTitle>
                  <CardDescription>Modify all project details and settings</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setEditingProject(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-800">Basic Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Project Title</Label>
                    <Input
                      id="edit-title"
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      rows={4}
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-status">Status</Label>
                      <Select
                        value={editingProject.status}
                        onValueChange={(value) => setEditingProject({ ...editingProject, status: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="on-hold">On Hold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-priority">Priority</Label>
                      <Select
                        value={editingProject.priority}
                        onValueChange={(value) => setEditingProject({ ...editingProject, priority: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-800">Timeline & Budget</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-start-date">Start Date</Label>
                      <Input
                        id="edit-start-date"
                        type="date"
                        value={editingProject.startDate}
                        onChange={(e) => setEditingProject({ ...editingProject, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-end-date">End Date</Label>
                      <Input
                        id="edit-end-date"
                        type="date"
                        value={editingProject.endDate}
                        onChange={(e) => setEditingProject({ ...editingProject, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-budget">Budget ($)</Label>
                    <Input
                      id="edit-budget"
                      type="number"
                      value={editingProject.budget}
                      onChange={(e) => setEditingProject({ ...editingProject, budget: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-progress">Progress (%)</Label>
                    <Input
                      id="edit-progress"
                      type="number"
                      min="0"
                      max="100"
                      value={editingProject.progress}
                      onChange={(e) => setEditingProject({ ...editingProject, progress: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-funding">Funding Source</Label>
                    <Input
                      id="edit-funding"
                      value={editingProject.fundingSource}
                      onChange={(e) => setEditingProject({ ...editingProject, fundingSource: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Team Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-blue-800">Team Information</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-team-lead">Team Lead</Label>
                    <Select
                      value={editingProject.teamLead}
                      onValueChange={(value) => setEditingProject({ ...editingProject, teamLead: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                        <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                        <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</SelectItem>
                        <SelectItem value="Dr. David Kim">Dr. David Kim</SelectItem>
                        <SelectItem value="Dr. Lisa Wang">Dr. Lisa Wang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-department">Department</Label>
                    <Select
                      value={editingProject.department}
                      onValueChange={(value) => setEditingProject({ ...editingProject, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AI Research">AI Research</SelectItem>
                        <SelectItem value="Biomedical Engineering">Biomedical Engineering</SelectItem>
                        <SelectItem value="Sustainable Technology">Sustainable Technology</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Materials Science">Materials Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Objectives & Deliverables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-800">Objectives</h3>
                  <Textarea
                    placeholder="Enter objectives (one per line)"
                    rows={6}
                    value={editingProject.objectives.join("\n")}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        objectives: e.target.value.split("\n").filter((obj) => obj.trim()),
                      })
                    }
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-800">Deliverables</h3>
                  <Textarea
                    placeholder="Enter deliverables (one per line)"
                    rows={6}
                    value={editingProject.deliverables.join("\n")}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        deliverables: e.target.value.split("\n").filter((del) => del.trim()),
                      })
                    }
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-blue-800">Tags</h3>
                <Input
                  placeholder="Enter tags separated by commas"
                  value={editingProject.tags.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag),
                    })
                  }
                />
                <div className="flex flex-wrap gap-2">
                  {editingProject.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-mustard-100 text-mustard-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4">
                <Button
                  className="flex-1 bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold"
                  onClick={handleSaveProject}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-blue-800">Add New Project</CardTitle>
              <CardDescription>Create a new research project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-title">Project Title</Label>
                  <Input id="new-title" placeholder="Enter project title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI Research">AI Research</SelectItem>
                      <SelectItem value="Biomedical Engineering">Biomedical Engineering</SelectItem>
                      <SelectItem value="Sustainable Technology">Sustainable Technology</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Materials Science">Materials Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-description">Description</Label>
                <Textarea id="new-description" placeholder="Project description" rows={4} />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-start-date">Start Date</Label>
                  <Input id="new-start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-end-date">End Date</Label>
                  <Input id="new-end-date" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-budget">Budget ($)</Label>
                  <Input id="new-budget" type="number" placeholder="100000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-funding">Funding Source</Label>
                  <Input id="new-funding" placeholder="National Science Foundation" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-team-lead">Team Lead</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team lead" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                    <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</SelectItem>
                    <SelectItem value="Dr. David Kim">Dr. David Kim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button
                  className="flex-1 bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold"
                  onClick={() => setShowAddProject(false)}
                >
                  Create Project
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAddProject(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
