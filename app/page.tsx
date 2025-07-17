import { ArrowRight, BookOpen, Users, Lightbulb, Award, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { GalleryGrid } from "@/components/gallery-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold">College Name</h1>
                <p className="text-sm text-gray-300">Research & Development</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#" className="hover:text-orange-500 transition-colors">
                Home
              </Link>
              <Link href="#research" className="hover:text-orange-500 transition-colors">
                Research
              </Link>
              <Link href="#projects" className="hover:text-orange-500 transition-colors">
                Projects
              </Link>
              <Link href="#gallery" className="hover:text-orange-500 transition-colors">
                Gallery
              </Link>
              <Link href="#publications" className="hover:text-orange-500 transition-colors">
                Publications
              </Link>
              <Link href="#team" className="hover:text-orange-500 transition-colors">
                Team
              </Link>
              <Link href="#contact" className="hover:text-orange-500 transition-colors">
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Advancing Knowledge Through <span className="text-orange-500">Innovation</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
            Our Research and Development department is committed to pushing the boundaries of knowledge, fostering
            innovation, and creating solutions that make a meaningful impact on society.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Explore Research Areas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
            >
              View Publications
            </Button>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section id="research" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Research Areas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our multidisciplinary approach spans across various fields of study, driving innovation and discovery in
              key areas of research.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Artificial Intelligence",
                description: "Machine learning, neural networks, and AI applications in various domains.",
                icon: <Lightbulb className="h-8 w-8 text-orange-500" />,
              },
              {
                title: "Sustainable Technology",
                description: "Green energy solutions, environmental monitoring, and sustainable development.",
                icon: <BookOpen className="h-8 w-8 text-orange-500" />,
              },
              {
                title: "Biomedical Engineering",
                description: "Medical devices, biotechnology, and healthcare innovation research.",
                icon: <Users className="h-8 w-8 text-orange-500" />,
              },
              {
                title: "Data Science",
                description: "Big data analytics, statistical modeling, and predictive systems.",
                icon: <Award className="h-8 w-8 text-orange-500" />,
              },
              {
                title: "Cybersecurity",
                description: "Information security, cryptography, and digital privacy protection.",
                icon: <Lightbulb className="h-8 w-8 text-orange-500" />,
              },
              {
                title: "Materials Science",
                description: "Advanced materials, nanotechnology, and material characterization.",
                icon: <BookOpen className="h-8 w-8 text-orange-500" />,
              },
            ].map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {area.icon}
                    <CardTitle className="text-slate-900">{area.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{area.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section id="projects" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Current Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our ongoing research projects that are shaping the future and addressing real-world challenges.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Smart Campus Initiative",
                status: "In Progress",
                description: "Developing IoT solutions for energy management and campus automation.",
                progress: 75,
                team: "Dr. Smith, Dr. Johnson, 8 Graduate Students",
              },
              {
                title: "AI-Powered Healthcare Diagnostics",
                status: "Phase 2",
                description: "Machine learning models for early disease detection and diagnosis.",
                progress: 60,
                team: "Dr. Williams, Dr. Brown, 6 Researchers",
              },
              {
                title: "Renewable Energy Storage",
                status: "Testing",
                description: "Advanced battery technologies for sustainable energy storage solutions.",
                progress: 85,
                team: "Dr. Davis, Dr. Miller, 4 PhD Candidates",
              },
              {
                title: "Quantum Computing Research",
                status: "Early Stage",
                description: "Exploring quantum algorithms and their practical applications.",
                progress: 30,
                team: "Dr. Wilson, Dr. Taylor, 5 Graduate Students",
              },
            ].map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-slate-900">{project.title}</CardTitle>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                      {project.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">{project.description}</CardDescription>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-slate-900 font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Team:</strong> {project.team}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Publications & Achievements */}
      <section id="publications" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Recent Publications & Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our research contributions to the academic community and industry recognition.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Recent Publications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-b pb-2">
                    <p className="font-medium text-sm">Machine Learning in Healthcare</p>
                    <p className="text-xs text-gray-600">Nature Medicine, 2024</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="font-medium text-sm">Sustainable Energy Systems</p>
                    <p className="text-xs text-gray-600">IEEE Transactions, 2024</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Quantum Computing Applications</p>
                    <p className="text-xs text-gray-600">Science Journal, 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Awards & Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-b pb-2">
                    <p className="font-medium text-sm">Excellence in Research Award</p>
                    <p className="text-xs text-gray-600">National Science Foundation</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="font-medium text-sm">Innovation Grant</p>
                    <p className="text-xs text-gray-600">Department of Energy</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Best Paper Award</p>
                    <p className="text-xs text-gray-600">International Conference</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Research Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">150+</div>
                    <div className="text-sm text-gray-600">Publications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">25</div>
                    <div className="text-sm text-gray-600">Active Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">$2.5M</div>
                    <div className="text-sm text-gray-600">Research Funding</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Research Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated researchers and faculty members driving innovation and discovery in our department.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Director of R&D",
                specialization: "Artificial Intelligence",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Dr. Michael Chen",
                role: "Senior Research Scientist",
                specialization: "Biomedical Engineering",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Dr. Emily Rodriguez",
                role: "Principal Investigator",
                specialization: "Sustainable Technology",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Dr. David Kim",
                role: "Research Professor",
                specialization: "Data Science",
                image: "/placeholder.svg?height=200&width=200",
              },
            ].map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.specialization}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Research Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our state-of-the-art facilities, research activities, and collaborative moments that drive
              innovation.
            </p>
          </div>

          <GalleryGrid />

          {/* View More Button */}
          <div className="text-center mt-12">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              View Full Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Interested in collaborating or learning more about our research? We'd love to hear from you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-500">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Address</h4>
                  <p className="text-gray-300">
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
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-gray-300">(555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-gray-300">research@college.edu</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-500">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Link href="#" className="flex items-center text-gray-300 hover:text-orange-500 transition-colors">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Research Proposals
                  </Link>
                  <Link href="#" className="flex items-center text-gray-300 hover:text-orange-500 transition-colors">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Collaboration Opportunities
                  </Link>
                  <Link href="#" className="flex items-center text-gray-300 hover:text-orange-500 transition-colors">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Funding Information
                  </Link>
                </div>
                <div className="space-y-2">
                  <Link href="#" className="flex items-center text-gray-300 hover:text-orange-500 transition-colors">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Graduate Programs
                  </Link>
                  <Link href="#" className="flex items-center text-gray-300 hover:text-orange-500 transition-colors">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Faculty Positions
                  </Link>
                  <Link href="#" className="flex items-center text-gray-300 hover:text-orange-500 transition-colors">
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
      <footer className="bg-slate-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-orange-500" />
              <div>
                <p className="font-bold">College Name - R&D</p>
                <p className="text-sm">Advancing Knowledge Through Innovation</p>
              </div>
            </div>
            <div className="text-sm">
              <p>&copy; 2024 College Name. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
