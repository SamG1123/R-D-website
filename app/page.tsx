"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GalleryGrid } from "@/components/gallery-grid"
import { TeamCarousel } from "@/components/team-carousel"
import { DynamicContentSections } from "@/components/dynamic-content-sections"
import { LoginModal } from "@/components/auth/login-modal"
import { UserMenu } from "@/components/auth/user-menu"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AuthProvider, useAuth } from "@/components/auth/auth-provider"
import { Search, Users, Award, BookOpen, ChevronRight, Microscope, Lightbulb, Target, Menu, X } from "lucide-react"

function CollegeWebsiteContent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, login, logout } = useAuth()

  const handleLogin = async (email: string, password: string, userType: "admin" | "member") => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()

        // Check if user role matches selected type
        if (
          (userType === "admin" && data.user.role === "admin") ||
          (userType === "member" && data.user.role === "member")
        ) {
          login(data.user, data.token)
          return true
        } else {
          return false
        }
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      logout()
      setShowDashboard(false)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (showDashboard && user?.role === "admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-800">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowDashboard(false)}
                className="border-blue-800 text-blue-800 hover:bg-blue-50"
              >
                View Website
              </Button>
              <UserMenu user={user} onLogout={handleLogout} />
            </div>
          </div>
        </div>
        <AdminDashboard />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center">
                <Microscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-800">Research & Development</h1>
                <p className="text-xs text-gray-600">Excellence in Innovation</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#research" className="text-gray-700 hover:text-blue-800 transition-colors">
                Research
              </a>
              <a href="#projects" className="text-gray-700 hover:text-blue-800 transition-colors">
                Projects
              </a>
              <a href="#team" className="text-gray-700 hover:text-blue-800 transition-colors">
                Team
              </a>
              <a href="#gallery" className="text-gray-700 hover:text-blue-800 transition-colors">
                Gallery
              </a>
              <a href="#publications" className="text-gray-700 hover:text-blue-800 transition-colors">
                Publications
              </a>
            </nav>

            {/* User Menu / Login */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center gap-4">
                  {user.role === "admin" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDashboard(true)}
                      className="border-blue-800 text-blue-800 hover:bg-blue-50"
                    >
                      Dashboard
                    </Button>
                  )}
                  <UserMenu user={user} onLogout={handleLogout} />
                </div>
              ) : (
                <Button onClick={() => setIsLoginOpen(true)} className="bg-blue-800 hover:bg-blue-700 text-white">
                  Login
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-white py-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#research"
                  className="text-gray-700 hover:text-blue-800 transition-colors px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Research
                </a>
                <a
                  href="#projects"
                  className="text-gray-700 hover:text-blue-800 transition-colors px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Projects
                </a>
                <a
                  href="#team"
                  className="text-gray-700 hover:text-blue-800 transition-colors px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Team
                </a>
                <a
                  href="#gallery"
                  className="text-gray-700 hover:text-blue-800 transition-colors px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Gallery
                </a>
                <a
                  href="#publications"
                  className="text-gray-700 hover:text-blue-800 transition-colors px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Publications
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Pioneering Research & <span className="text-mustard-400">Innovation</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Advancing knowledge through cutting-edge research, collaborative innovation, and academic excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold">
                Explore Research
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-800 bg-transparent"
              >
                View Publications
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-blue-800 mb-2">50+</h3>
              <p className="text-gray-600">Active Research Projects</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-mustard-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-3xl font-bold text-blue-800 mb-2">25+</h3>
              <p className="text-gray-600">Research Faculty</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-blue-800 mb-2">200+</h3>
              <p className="text-gray-600">Publications</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-mustard-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-3xl font-bold text-blue-800 mb-2">15+</h3>
              <p className="text-gray-600">Awards Won</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              To advance human knowledge through innovative research, foster academic excellence, and create solutions
              that address global challenges while preparing the next generation of researchers and innovators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  Pushing the boundaries of knowledge through groundbreaking research and creative problem-solving
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-mustard-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-mustard-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">Collaboration</h3>
                <p className="text-gray-600">
                  Building partnerships across disciplines and institutions to tackle complex global challenges
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">Impact</h3>
                <p className="text-gray-600">
                  Creating meaningful change through research that benefits society and improves lives worldwide
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <DynamicContentSections />

      {/* Team Section */}
      <section id="team">
        <TeamCarousel />
      </section>

      {/* Gallery Section */}
      <section id="gallery">
        <GalleryGrid />
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Microscope className="h-6 w-6" />
                <span className="text-xl font-bold">R&D Department</span>
              </div>
              <p className="text-blue-200 mb-4">
                Leading innovation through research excellence and academic collaboration.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#research" className="hover:text-white transition-colors">
                    Research Areas
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white transition-colors">
                    Current Projects
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-white transition-colors">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#publications" className="hover:text-white transition-colors">
                    Publications
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Research Areas</h4>
              <ul className="space-y-2 text-blue-200">
                <li>Artificial Intelligence</li>
                <li>Biomedical Engineering</li>
                <li>Sustainable Technology</li>
                <li>Data Science</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-blue-200">
                <p>Research & Development Department</p>
                <p>College Campus, Building A</p>
                <p>Email: research@college.edu</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 College Research & Development Department. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
    </div>
  )
}

export default function CollegeWebsite() {
  return (
    <AuthProvider>
      <CollegeWebsiteContent />
    </AuthProvider>
  )
}
