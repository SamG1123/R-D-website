"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, LogOut, Settings, FileText, Users } from "lucide-react"

interface UserMenuProps {
  user: { email: string; name: string; type: "admin" | "member" }
  onLogout: () => void
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-white hover:text-mustard-600 hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user.type === "admin" ? <Shield className="h-5 w-5" /> : <Users className="h-5 w-5" />}
        <span className="font-medium">{user.name}</span>
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <Card className="absolute right-0 top-full mt-2 w-64 z-20 bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="border-b pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  {user.type === "admin" ? (
                    <Shield className="h-5 w-5 text-mustard-600" />
                  ) : (
                    <Users className="h-5 w-5 text-blue-800" />
                  )}
                  <div>
                    <p className="font-bold text-blue-800">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-mustard-600 font-medium capitalize">{user.type} Account</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {user.type === "admin" && (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:text-blue-800 hover:bg-blue-50"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:text-blue-800 hover:bg-blue-50"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Manage Content
                    </Button>
                  </>
                )}

                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-blue-800 hover:bg-blue-50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>

                <hr className="my-2" />

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
