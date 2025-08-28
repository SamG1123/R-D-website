"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  email: string
  name: string
  type: "admin" | "member"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, userType: "admin" | "member") => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for authentication
const DEMO_USERS = {
  "admin@college.edu": {
    password: "admin123",
    name: "Dr. Admin User",
    type: "admin" as const,
  },
  "member@college.edu": {
    password: "member123",
    name: "Dr. Member User",
    type: "member" as const,
  },
  "sarah.johnson@college.edu": {
    password: "password123",
    name: "Dr. Sarah Johnson",
    type: "member" as const,
  },
  "michael.chen@college.edu": {
    password: "password123",
    name: "Dr. Michael Chen",
    type: "member" as const,
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("rd-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("rd-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, userType: "admin" | "member"): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const demoUser = DEMO_USERS[email as keyof typeof DEMO_USERS]

    if (demoUser && demoUser.password === password && demoUser.type === userType) {
      const userData: User = {
        email,
        name: demoUser.name,
        type: demoUser.type,
      }

      setUser(userData)
      localStorage.setItem("rd-user", JSON.stringify(userData))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("rd-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
