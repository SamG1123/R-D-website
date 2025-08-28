"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Upload, Download, RefreshCw } from "lucide-react"

export function SystemSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-blue-800">System Settings</h2>
        <p className="text-gray-600">Configure website settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">General Settings</CardTitle>
            <CardDescription>Basic website configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue="College Name - R&D" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea id="siteDescription" defaultValue="Research & Development Department" rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" type="email" defaultValue="research@college.edu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="(555) 123-4567" />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">Appearance</CardTitle>
            <CardDescription>Customize website appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <div className="flex items-center space-x-2">
                <Input id="logo" type="file" accept="image/*" />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Color Scheme</Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-800 rounded"></div>
                  <span className="text-sm">Blue: #2E3192</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-mustard-600 rounded"></div>
                  <span className="text-sm">Mustard: #FDB913</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white border rounded"></div>
                  <span className="text-sm">White</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode">Enable Dark Mode</Label>
              <Switch id="darkMode" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">Security</CardTitle>
            <CardDescription>Security and access control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
              <Switch id="twoFactor" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="loginAttempts">Limit Login Attempts</Label>
              <Switch id="loginAttempts" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input id="sessionTimeout" type="number" defaultValue="60" />
            </div>
            <Button className="w-full bg-blue-800 hover:bg-blue-700 text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset All Sessions
            </Button>
          </CardContent>
        </Card>

        {/* Backup & Export */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">Backup & Export</CardTitle>
            <CardDescription>Data management and backups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoBackup">Automatic Backups</Label>
              <Switch id="autoBackup" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold">
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  )
}
