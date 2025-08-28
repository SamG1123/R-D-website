"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Users, FileText, ImageIcon, Settings, Edit, CheckCircle, X } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
  category: "users" | "projects" | "content" | "gallery" | "system"
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

const allPermissions: Permission[] = [
  // User Permissions
  { id: "users.view", name: "View Users", description: "View user profiles and information", category: "users" },
  { id: "users.create", name: "Create Users", description: "Add new users to the system", category: "users" },
  { id: "users.edit", name: "Edit Users", description: "Modify user information and settings", category: "users" },
  { id: "users.delete", name: "Delete Users", description: "Remove users from the system", category: "users" },

  // Project Permissions
  {
    id: "projects.view",
    name: "View Projects",
    description: "View project details and information",
    category: "projects",
  },
  { id: "projects.create", name: "Create Projects", description: "Create new research projects", category: "projects" },
  {
    id: "projects.edit",
    name: "Edit Projects",
    description: "Modify project details and settings",
    category: "projects",
  },
  {
    id: "projects.delete",
    name: "Delete Projects",
    description: "Remove projects from the system",
    category: "projects",
  },

  // Content Permissions
  { id: "content.view", name: "View Content", description: "View published and draft content", category: "content" },
  {
    id: "content.create",
    name: "Create Content",
    description: "Create new content and publications",
    category: "content",
  },
  { id: "content.edit", name: "Edit Content", description: "Modify existing content", category: "content" },
  {
    id: "content.publish",
    name: "Publish Content",
    description: "Publish content to the website",
    category: "content",
  },

  // Gallery Permissions
  { id: "gallery.view", name: "View Gallery", description: "View gallery images and media", category: "gallery" },
  { id: "gallery.upload", name: "Upload Media", description: "Upload images and media files", category: "gallery" },
  { id: "gallery.edit", name: "Edit Media", description: "Modify media metadata and details", category: "gallery" },
  { id: "gallery.delete", name: "Delete Media", description: "Remove media from gallery", category: "gallery" },

  // System Permissions
  { id: "system.settings", name: "System Settings", description: "Access system configuration", category: "system" },
  { id: "system.backup", name: "Backup Management", description: "Manage system backups", category: "system" },
  { id: "system.logs", name: "View Logs", description: "Access system activity logs", category: "system" },
  {
    id: "system.maintenance",
    name: "System Maintenance",
    description: "Perform system maintenance tasks",
    category: "system",
  },
]

const roles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access with all permissions",
    permissions: allPermissions.map((p) => p.id),
    userCount: 3,
  },
  {
    id: "member",
    name: "Research Member",
    description: "Limited access for research activities",
    permissions: ["projects.view", "content.view", "content.create", "gallery.view", "gallery.upload"],
    userCount: 24,
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to public content",
    permissions: ["projects.view", "content.view", "gallery.view"],
    userCount: 100,
  },
]

export function PermissionsManagement() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [rolePermissions, setRolePermissions] = useState<string[]>([])

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role)
    setRolePermissions([...role.permissions])
  }

  const togglePermission = (permissionId: string) => {
    setRolePermissions((prev) =>
      prev.includes(permissionId) ? prev.filter((p) => p !== permissionId) : [...prev, permissionId],
    )
  }

  const saveRolePermissions = () => {
    if (selectedRole) {
      // Update role permissions logic here
      console.log(`Updating permissions for ${selectedRole.name}:`, rolePermissions)
      setSelectedRole(null)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "users":
        return <Users className="h-4 w-4" />
      case "projects":
        return <FileText className="h-4 w-4" />
      case "content":
        return <FileText className="h-4 w-4" />
      case "gallery":
        return <ImageIcon className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-blue-800">Permissions Management</h2>
        <p className="text-gray-600">Manage user roles and system permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">User Roles</CardTitle>
            <CardDescription>Manage system roles and their permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedRole?.id === role.id
                      ? "border-mustard-600 bg-mustard-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => handleRoleSelect(role)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-blue-800">{role.name}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {role.userCount} users
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                          {role.permissions.length} permissions
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-blue-800 hover:text-blue-700">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permissions Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">
              {selectedRole ? `Edit ${selectedRole.name} Permissions` : "Select a Role"}
            </CardTitle>
            <CardDescription>
              {selectedRole ? "Configure permissions for this role" : "Choose a role to edit its permissions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedRole ? (
              <div className="space-y-6">
                {/* Permissions by Category */}
                {["users", "projects", "content", "gallery", "system"].map((category) => {
                  const categoryPermissions = allPermissions.filter((p) => p.category === category)

                  return (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(category)}
                        <h4 className="font-bold text-blue-800 capitalize">{category}</h4>
                      </div>
                      <div className="space-y-2 pl-6">
                        {categoryPermissions.map((permission) => (
                          <div key={permission.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium text-sm">{permission.name}</p>
                              <p className="text-xs text-gray-600">{permission.description}</p>
                            </div>
                            <Switch
                              checked={rolePermissions.includes(permission.id)}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {/* Save Button */}
                <div className="pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button
                      className="flex-1 bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold"
                      onClick={saveRolePermissions}
                    >
                      Save Permissions
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSelectedRole(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a role from the left to edit its permissions</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Permission Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">Permission Matrix</CardTitle>
          <CardDescription>Overview of all roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permission</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Administrator</TableHead>
                <TableHead>Research Member</TableHead>
                <TableHead>Viewer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPermissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{permission.name}</p>
                      <p className="text-sm text-gray-600">{permission.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(permission.category)}
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 capitalize">
                        {permission.category}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {roles[0].permissions.includes(permission.id) ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400" />
                    )}
                  </TableCell>
                  <TableCell>
                    {roles[1].permissions.includes(permission.id) ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400" />
                    )}
                  </TableCell>
                  <TableCell>
                    {roles[2].permissions.includes(permission.id) ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
