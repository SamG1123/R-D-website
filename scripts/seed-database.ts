import { getDatabase } from "../lib/mongodb"
import bcrypt from "bcryptjs"

async function seedDatabase() {
  try {
    const db = await getDatabase()

    // Clear existing data
    await Promise.all([
      db.collection("users").deleteMany({}),
      db.collection("projects").deleteMany({}),
      db.collection("content").deleteMany({}),
      db.collection("team_members").deleteMany({}),
      db.collection("gallery").deleteMany({}),
    ])

    console.log("Cleared existing data...")

    // Seed Users
    const hashedPassword = await bcrypt.hash("password123", 12)
    const users = [
      {
        firstName: "Admin",
        lastName: "User",
        usn: "ADM001",
        email: "admin@college.edu",
        phone: "+1-555-0001",
        password: await bcrypt.hash("admin123", 12),
        role: "admin",
        department: "Administration",
        status: "active",
        joinDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Sarah",
        lastName: "Johnson",
        usn: "FAC001",
        email: "s.johnson@college.edu",
        phone: "+1-555-0101",
        password: hashedPassword,
        role: "member",
        department: "AI Research",
        status: "active",
        joinDate: new Date("2023-01-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Michael",
        lastName: "Chen",
        usn: "FAC002",
        email: "m.chen@college.edu",
        phone: "+1-555-0102",
        password: hashedPassword,
        role: "member",
        department: "Biomedical Engineering",
        status: "active",
        joinDate: new Date("2023-02-20"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const userResult = await db.collection("users").insertMany(users)
    console.log(`Inserted ${userResult.insertedCount} users`)

    // Seed Team Members
    const teamMembers = [
      {
        name: "Dr. Sarah Johnson",
        role: "Director of R&D",
        specialization: "Artificial Intelligence",
        email: "s.johnson@college.edu",
        bio: "Leading AI research with 15+ years of experience in machine learning and neural networks.",
        status: "active",
        publications: ["AI in Healthcare", "Machine Learning Fundamentals"],
        achievements: ["Best Paper Award 2023", "Innovation Grant Winner"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dr. Michael Chen",
        role: "Senior Research Scientist",
        specialization: "Biomedical Engineering",
        email: "m.chen@college.edu",
        bio: "Expert in medical device development and tissue engineering with 20+ publications.",
        status: "active",
        publications: ["Biomedical Devices", "Tissue Engineering"],
        achievements: ["Research Excellence Award"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dr. Emily Rodriguez",
        role: "Principal Investigator",
        specialization: "Sustainable Technology",
        email: "e.rodriguez@college.edu",
        bio: "Pioneering research in renewable energy systems and environmental sustainability.",
        status: "active",
        publications: ["Renewable Energy Systems"],
        achievements: ["Green Technology Award"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const teamResult = await db.collection("team_members").insertMany(teamMembers)
    console.log(`Inserted ${teamResult.insertedCount} team members`)

    // Seed Content
    const content = [
      {
        title: "Artificial Intelligence",
        type: "research-area",
        status: "published",
        content:
          "Machine learning, neural networks, and AI applications in various domains including healthcare, finance, and autonomous systems.",
        author: "Dr. Sarah Johnson",
        category: "Research Areas",
        tags: ["AI", "Machine Learning", "Neural Networks"],
        publishDate: new Date(),
        createdBy: userResult.insertedIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Sustainable Technology",
        type: "research-area",
        status: "published",
        content: "Green energy solutions, environmental monitoring, and sustainable development technologies.",
        author: "Dr. Emily Rodriguez",
        category: "Research Areas",
        tags: ["Sustainability", "Green Energy", "Environment"],
        publishDate: new Date(),
        createdBy: userResult.insertedIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Machine Learning in Healthcare",
        type: "publication",
        status: "published",
        content:
          "A comprehensive study on the application of machine learning algorithms in medical diagnosis and treatment.",
        author: "Dr. Sarah Johnson",
        category: "Publications",
        tags: ["Healthcare", "Machine Learning", "Medical"],
        publishDate: new Date("2024-01-15"),
        createdBy: userResult.insertedIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Excellence in Research Award 2024",
        type: "achievement",
        status: "published",
        content: "Recognition for outstanding contributions to artificial intelligence research and development.",
        author: "Research Department",
        category: "Awards",
        tags: ["Award", "Recognition", "Excellence"],
        publishDate: new Date("2024-01-10"),
        createdBy: userResult.insertedIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const contentResult = await db.collection("content").insertMany(content)
    console.log(`Inserted ${contentResult.insertedCount} content items`)

    // Seed Projects
    const projects = [
      {
        title: "AI-Powered Healthcare Diagnostics",
        description:
          "Developing machine learning models for early disease detection and diagnosis using medical imaging and patient data.",
        status: "active",
        priority: "high",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2025-06-30"),
        budget: 250000,
        teamLead: "Dr. Sarah Johnson",
        teamMembers: ["Dr. Michael Chen", "Dr. Emily Rodriguez"],
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
        createdBy: userResult.insertedIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Smart Campus Initiative",
        description: "Implementing IoT solutions for energy management, security, and campus automation.",
        status: "active",
        priority: "medium",
        startDate: new Date("2023-09-01"),
        endDate: new Date("2024-12-31"),
        budget: 180000,
        teamLead: "Dr. Emily Rodriguez",
        teamMembers: ["Dr. Michael Chen"],
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
        createdBy: userResult.insertedIds[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const projectResult = await db.collection("projects").insertMany(projects)
    console.log(`Inserted ${projectResult.insertedCount} projects`)

    // Seed Gallery
    const galleryItems = [
      {
        title: "AI Research Laboratory",
        description:
          "State-of-the-art computing facility equipped with high-performance GPUs and specialized hardware for artificial intelligence research.",
        category: "Laboratories",
        imageUrl: "/ai-research-lab.png",
        status: "published",
        tags: ["AI", "Laboratory", "Research"],
        uploadedBy: userResult.insertedIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Research Team Collaboration",
        description:
          "Interdisciplinary team of researchers, faculty, and graduate students collaborating on breakthrough solutions.",
        category: "Research Activities",
        imageUrl: "/research-team-meeting.png",
        status: "published",
        tags: ["Team", "Collaboration", "Research"],
        uploadedBy: userResult.insertedIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Annual Research Symposium",
        description:
          "Our flagship annual event where researchers present their latest findings and breakthrough discoveries.",
        category: "Events",
        imageUrl: "/research-symposium-presentation.png",
        status: "published",
        tags: ["Event", "Symposium", "Presentation"],
        uploadedBy: userResult.insertedIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const galleryResult = await db.collection("gallery").insertMany(galleryItems)
    console.log(`Inserted ${galleryResult.insertedCount} gallery items`)

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

// Run the seed function
seedDatabase()
