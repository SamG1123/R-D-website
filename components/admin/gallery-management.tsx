"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Upload, ImageIcon, Eye } from "lucide-react"

const mockGalleryItems = [
  {
    id: 1,
    title: "AI Research Laboratory",
    category: "Laboratories",
    description: "State-of-the-art computing facility",
    image: "/placeholder.svg?height=200&width=300",
    uploadDate: "2024-01-15",
    status: "published",
  },
  {
    id: 2,
    title: "Research Team Collaboration",
    category: "Research Activities",
    description: "Interdisciplinary team meeting",
    image: "/placeholder.svg?height=200&width=300",
    uploadDate: "2024-01-14",
    status: "published",
  },
  {
    id: 3,
    title: "Annual Research Symposium",
    category: "Events",
    description: "Flagship annual research event",
    image: "/placeholder.svg?height=200&width=300",
    uploadDate: "2024-01-13",
    status: "draft",
  },
]

export function GalleryManagement() {
  const [galleryItems, setGalleryItems] = useState(mockGalleryItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showAddImage, setShowAddImage] = useState(false)

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-800">Gallery Management</h2>
          <p className="text-gray-600">Manage research gallery images and media</p>
        </div>
        <Button
          className="bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold"
          onClick={() => setShowAddImage(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Upload Image
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
                  placeholder="Search gallery items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Laboratories">Laboratories</SelectItem>
                <SelectItem value="Research Activities">Research Activities</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
                <SelectItem value="Awards">Awards</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative">
              <ImageIcon src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={item.status === "published" ? "default" : "secondary"}
                  className={
                    item.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {item.status}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-bold text-blue-800">{item.title}</h3>
                <Badge variant="secondary" className="bg-mustard-100 text-mustard-800 text-xs">
                  {item.category}
                </Badge>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                <p className="text-xs text-gray-500">Uploaded: {item.uploadDate}</p>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Button size="sm" variant="ghost" className="text-blue-800 hover:text-blue-700">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-blue-800 hover:text-blue-700">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Image Modal */}
      {showAddImage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-blue-800">Upload New Image</CardTitle>
              <CardDescription>Add a new image to the research gallery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image File</Label>
                <div className="flex items-center space-x-2">
                  <Input id="image" type="file" accept="image/*" />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Image title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laboratories">Laboratories</SelectItem>
                      <SelectItem value="Research Activities">Research Activities</SelectItem>
                      <SelectItem value="Events">Events</SelectItem>
                      <SelectItem value="Awards">Awards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Image description" rows={3} />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button
                  className="flex-1 bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold"
                  onClick={() => setShowAddImage(false)}
                >
                  Upload Image
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAddImage(false)}>
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
