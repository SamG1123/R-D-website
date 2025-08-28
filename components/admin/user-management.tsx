"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Mail, Shield, Filter, Loader2 } from "lucide-react"
import { useApi, useApiMutation } from "@/lib/hooks/useApi"
import { toast } from "@/components/ui/use-toast"

interface UserManagementUser {
  _id: string
  firstName: string
  lastName: string
  usn: string
  email: string
  phone: string
  role: "admin" | "member"
  department: string
  status: "active" | "inactive"
  lastLogin?: string
  joinDate: string
  createdAt: string
  updatedAt: string
}

interface CreateUserData {
  firstName: string
  lastName: string
  usn: string
  email: string
  phone: string
  password: string
  role: "admin" | "member"
  department: string
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState<CreateUserData>({
    firstName: "",
    lastName: "",
    usn: "",
    email: "",
    phone: "",
    password: "",
    role: "member",
    department: "",
  })

  // Build API URL with filters
  const buildApiUrl = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.append("search", searchTerm)
    if (roleFilter !== "all") params.append("role", roleFilter)
    return `/api/users?${params.toString()}`
  }

  const { data: usersData, loading, error } = useApi<{ users: UserManagementUser[] }>(buildApiUrl())
  // Add a manual refetch workaround if useApi does not provide refetch
  const [refreshIndex, setRefreshIndex] = useState(0)
  const refetch = () => setRefreshIndex((i) => i + 1)
  // Re-run useApi when refreshIndex changes
  useApi<{ users: UserManagementUser[] }>(buildApiUrl() + `&refresh=${refreshIndex}`)
  const { mutate: createUser, loading: creating } = useApiMutation<{ user: UserManagementUser }, CreateUserData>()
  const { mutate: deleteUser, loading: deleting } = useApiMutation()

  const users = usersData?.users || []

  const handleCreateUser = async () => {
    try {
      // Validate required fields
      const requiredFields = ["firstName", "lastName", "usn", "email", "phone", "password", "department"]
      for (const field of requiredFields) {
        if (!newUser[field as keyof CreateUserData]) {
          toast({
            title: "Validation Error",
            description: `${field} is required`,
            variant: "destructive",
          })
          return
        }
      }

      await createUser("/api/users", {
        method: "POST",
        data: newUser,
      })

      toast({
        title: "Success",
        description: "User created successfully",
      })

      setShowAddUser(false)
      setNewUser({
        firstName: "",
        lastName: "",
        usn: "",
        email: "",
        phone: "",
        password: "",
        role: "member",
        department: "",
      })
      refetch()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      await deleteUser(`/api/users/${userId}`, {
        method: "DELETE",
      })

      toast({
        title: "Success",
        description: "User deleted successfully",
      })

      refetch()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  // Refetch when search term or filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refetch()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, roleFilter])

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading users</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-800">User Management</h2>
          <p className="text-gray-600">Manage system users and their permissions</p>
        </div>
        <Button
          className="bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold"
          onClick={() => setShowAddUser(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
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
                  placeholder="Search users by name, email, or USN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">
            Users ({users.length}){loading && <Loader2 className="h-4 w-4 animate-spin inline ml-2" />}
          </CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && users.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>USN</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-full">
                          {user.role === "admin" ? (
                            <Shield className="h-4 w-4 text-mustard-600" />
                          ) : (
                            <div className="h-4 w-4 text-blue-800"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700">
                        {user.usn}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === "admin" ? "default" : "secondary"}
                        className={
                          user.role === "admin" ? "bg-mustard-100 text-mustard-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "active" ? "default" : "secondary"}
                        className={
                          user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {user.status}
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
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={deleting}
                        >
                          {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle className="text-blue-800">Add New User</CardTitle>
              <CardDescription>Create a new user account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="usn">USN</Label>
                  <Input
                    id="usn"
                    placeholder="FAC005"
                    value={newUser.usn}
                    onChange={(e) => setNewUser({ ...newUser, usn: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="j.doe@college.edu"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1-555-0105"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newUser.department}
                    onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI Research">AI Research</SelectItem>
                      <SelectItem value="Biomedical Engineering">Biomedical Engineering</SelectItem>
                      <SelectItem value="Sustainable Technology">Sustainable Technology</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="Materials Science">Materials Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value: "admin" | "member") => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button
                  className="flex-1 bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold"
                  onClick={handleCreateUser}
                  disabled={creating}
                >
                  {creating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Create User
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAddUser(false)}>
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
