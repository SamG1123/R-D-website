"use client"

import {useState} from "react"

import { ArrowRight, Users, Award, ChevronRight, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DynamicContentSections } from "@/components/dynamic-content-sections"
import Link from "next/link"
import ProjectsSection from '@/components/projects-section';
import { GalleryGrid } from "@/components/gallery-grid"
import { TeamCarousel } from "@/components/team-carousel"

import { LoginModal } from "@/components/auth/login-modal"
import { UserMenu } from "@/components/auth/user-menu"
import { AuthProvider, useAuth } from "@/components/auth/auth-provider"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user, login, logout } = useAuth()
  const { showAdminDashboard, setShowAdminDashboard } = useAuth()

  // If admin clicked "Admin Dashboard", replace page with admin panel
  if (user?.type === "admin" && showAdminDashboard) {
    return <AdminDashboard onClose={() => setShowAdminDashboard(false)} />
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-blue-800 text-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="College Logo" className="h-25 w-20 object-contain" />
              <div>
                <h1 className="text-xl font-bold">Nitte Meenakshi Institute of Technology</h1>
                <p className="text-sm text-gray-300">Research & Development</p>
              </div>
            </div>
            <div  className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#" className="hover:text-mustard-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="#research" className="hover:text-mustard-600 transition-colors font-medium">
                Research
              </Link>
              <Link href="#projects" className="hover:text-mustard-600 transition-colors font-medium">
                Projects
              </Link>
              <Link href="#gallery" className="hover:text-mustard-600 transition-colors font-medium">
                Gallery
              </Link>
              <Link href="#publications" className="hover:text-mustard-600 transition-colors font-medium">
                Publications
              </Link>
              <Link href="#team" className="hover:text-mustard-600 transition-colors font-medium">
                Team
              </Link>
              <Link href="#contact" className="hover:text-mustard-600 transition-colors font-medium">
                Contact
              </Link>
            </div>

            {/* Authentication Section */}
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.type === "admin" && (
                    <Button
                      variant="ghost"
                      className="text-white hover:text-mustard-600 hover:bg-white/10 font-medium"
                      onClick={() => setShowAdminDashboard(true)}
                    >
                      Admin Dashboard
                    </Button>
                  )}
                  <UserMenu user={user} onLogout={logout} />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="text-white hover:text-mustard-600 hover:bg-white/10 font-medium"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </nav>
        </div>
      </header>


      {/* Admin/Member Dashboard Banner */}
      {user && (
        <div
          className={`${
            user.type === "admin" ? "bg-mustard-100 border-mustard-600" : "bg-blue-50 border-blue-600"
          } border-l-4 p-4`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${user.type === "admin" ? "bg-mustard-600" : "bg-blue-800"}`}>
                  {user.type === "admin" ? (
                    <Award className="h-5 w-5 text-white" />
                  ) : (
                    <Users className="h-5 w-5 text-white" />
                  )}
                </div>
                <div>
                  <p className={`font-bold ${user.type === "admin" ? "text-mustard-800" : "text-blue-800"}`}>
                    Welcome back, {user.name}!
                  </p>
                  <p className="text-sm text-gray-600">
                    {user.type === "admin"
                      ? "You have full administrative access to manage content and users."
                      : "You have member access to view and contribute to research content."}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {user.type === "admin" && (
                  <>
                    <Button size="sm" className="bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold">
                      Manage Content
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-mustard-600 text-mustard-600 hover:bg-mustard-50 bg-transparent"
                    >
                      User Management
                    </Button>
                  </>
                )}
                {user.type === "member" && (
                  <Button size="sm" className="bg-blue-800 hover:bg-blue-700 text-white font-bold">
                    My Research
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="mt-8">
  {user?.type === "admin" && (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => setShowAdminDashboard(true)}
        className="bg-white text-blue-800 hover:bg-gray-100 font-bold px-5 py-2 rounded-lg"
      >
        Admin Dashboard
      </button>
      <button className="bg-white text-blue-800 hover:bg-gray-100 font-bold px-5 py-2 rounded-lg">
        User Management
      </button>
    </div>
  )}
  {user?.type === "member" && (
    <button className="bg-white text-blue-800 hover:bg-gray-100 font-bold px-5 py-2 rounded-lg">
      My Research
    </button>
  )}
</div>

      <section className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Advancing Knowledge Through <span className="text-mustard-600">Innovation</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300 font-medium">
            Our Research and Development department is committed to pushing the boundaries of knowledge, fostering
            innovation, and creating solutions that make a meaningful impact on society.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold">
              Explore Research Areas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-800 bg-transparent font-bold"
            >
              View Publications
            </Button>
          </div>
        </div>
      </section>

      {/*Dynamic Content Sections */}
      <DynamicContentSections />

      {/* Team Section */}
      <section id="team" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Research Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-medium">
              Meet the dedicated researchers and faculty members driving innovation and discovery in our department.
            </p>
          </div>
          <TeamCarousel />

          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
            <div>
              <div className="text-3xl font-bold text-mustard-600">25+</div>
              <div className="text-sm text-gray-600 font-medium">Faculty Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-mustard-600">50+</div>
              <div className="text-sm text-gray-600 font-medium">Graduate Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-mustard-600">15</div>
              <div className="text-sm text-gray-600 font-medium">Research Areas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-mustard-600">200+</div>
              <div className="text-sm text-gray-600 font-medium">Publications</div>
                  </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Research Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-medium">
              Explore our state-of-the-art facilities, research activities, and collaborative moments that drive
              innovation.
            </p>
          </div>

          <GalleryGrid />

          {/* View More Button */}
          <div className="text-center mt-12">
            <Button size="lg" className="bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold">
              View Full Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-300 max-w-2xl mx-auto font-medium">
              Interested in collaborating or learning more about our research? We'd love to hear from you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 text-mustard-600">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-1">Address</h4>
                  <p className="text-gray-300 font-medium">
                    Research & Development Department
                    <br />
                    College Name
                    <br />
                    123 University Avenue
                    <br />
                    City, State 12345
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Phone</h4>
                  <p className="text-gray-300 font-medium">(555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-gray-300 font-medium">research@college.edu</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-mustard-600">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="flex items-center text-gray-300 hover:text-mustard-600 transition-colors font-medium"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Research Proposals
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center text-gray-300 hover:text-mustard-600 transition-colors font-medium"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Collaboration Opportunities
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center text-gray-300 hover:text-mustard-600 transition-colors font-medium"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Funding Information
                  </Link>
                </div>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="flex items-center text-gray-300 hover:text-mustard-600 transition-colors font-medium"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Graduate Programs
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center text-gray-300 hover:text-mustard-600 transition-colors font-medium"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Faculty Positions
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center text-gray-300 hover:text-mustard-600 transition-colors font-medium"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    News & Events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src="/logo.png" alt="College Logo" className="h-6 w-6 object-contain" />
              <div>
                <p className="font-bold">College Name - R&D</p>
                <p className="text-sm font-medium">Advancing Knowledge Through Innovation</p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium">&copy; 2024 College Name. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={login} />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  )
}


