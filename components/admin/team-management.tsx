"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Users, Mail, Upload } from "lucide-react"

const mockTeamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Director of R&D",
    specialization: "Artificial Intelligence",
    email: "s.johnson@college.edu",
    bio: "Leading AI research with 15+ years of experience",
    status: "active",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Senior Research Scientist",
    specialization: "Biomedical Engineering",
    email: "m.chen@college.edu",
    bio: "Expert in medical device development",
    status: "active",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Principal Investigator",
    specialization: "Sustainable Technology",
    email: "e.rodriguez@college.edu",
    bio: "Pioneering research in renewable energy",
    status: "inactive",
  },
]

export function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddMember, setShowAddMember] = useState(false)

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-800">Team Management</h2>
          <p className="text-gray-600">Manage research team members and faculty</p>
        </div>
        <Button
          className="bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold"
          onClick={() => setShowAddMember(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">Team Members ({filteredMembers.length})</CardTitle>
          <CardDescription>Manage faculty and research team</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-mustard-600">{member.role}</p>
                  </TableCell>
                  <TableCell>{member.specialization}</TableCell>
                  <TableCell>
                    <Badge
                      variant={member.status === "active" ? "default" : "secondary"}
                      className={
                        member.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-800 hover:text-blue-700">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-700">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
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

      {/* Add Team Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-blue-800">Add Team Member</CardTitle>
              <CardDescription>Add a new faculty or research team member</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Dr. John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="j.doe@college.edu" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role/Position</Label>
                  <Input id="role" placeholder="Research Professor" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input id="specialization" placeholder="Computer Science" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea id="bio" placeholder="Brief biography and research interests" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Profile Photo</Label>
                <div className="flex items-center space-x-2">
                  <Input id="photo" type="file" accept="image/*" />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button
                  className="flex-1 bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold"
                  onClick={() => setShowAddMember(false)}
                >
                  Add Member
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAddMember(false)}>
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
