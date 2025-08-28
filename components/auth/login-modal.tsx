"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Eye, EyeOff, User, Shield } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string, userType: "admin" | "member") => Promise<boolean>
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"admin" | "member">("member")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await onLogin(email, password, userType)
      if (success) {
        onClose()
        setEmail("")
        setPassword("")
        setError("")
      } else {
        setError("Invalid credentials. Please try again.")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-blue-800/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-bold text-blue-800 text-center">Login</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Access your account to manage research content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={userType === "member" ? "default" : "outline"}
                className={`${
                  userType === "member"
                    ? "bg-blue-800 hover:bg-blue-700 text-white"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setUserType("member")}
              >
                <User className="h-4 w-4 mr-2" />
                Member
              </Button>
              <Button
                type="button"
                variant={userType === "admin" ? "default" : "outline"}
                className={`${
                  userType === "admin"
                    ? "bg-mustard-600 hover:bg-mustard-700 text-blue-800"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setUserType("admin")}
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-800 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 focus:border-blue-800 focus:ring-blue-800"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-800 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300 focus:border-blue-800 focus:ring-blue-800 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">{error}</div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full font-bold ${
                userType === "admin"
                  ? "bg-mustard-600 hover:bg-mustard-700 text-blue-800"
                  : "bg-blue-800 hover:bg-blue-700 text-white"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : `Sign In as ${userType === "admin" ? "Admin" : "Member"}`}
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-800">
                Forgot Password?
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
