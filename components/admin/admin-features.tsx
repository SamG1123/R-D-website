"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Download,
  Upload,
  RefreshCw,
  Database,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
  FileText,
  Users,
  BarChart3,
} from "lucide-react"

export function AdminFeatures() {
  const [systemStatus, setSystemStatus] = useState({
    database: "healthy",
    server: "healthy",
    storage: "warning",
    backup: "healthy",
  })

  const recentActivities = [
    {
      id: 1,
      action: "User created",
      details: "New member Dr. Jane Smith added",
      timestamp: "2024-01-15 14:30",
      type: "user",
      status: "success",
    },
    {
      id: 2,
      action: "Project updated",
      details: "AI Healthcare project progress updated to 75%",
      timestamp: "2024-01-15 13:45",
      type: "project",
      status: "success",
    },
    {
      id: 3,
      action: "System backup",
      details: "Automated backup completed successfully",
      timestamp: "2024-01-15 12:00",
      type: "system",
      status: "success",
    },
    {
      id: 4,
      action: "Login attempt",
      details: "Failed login attempt from unknown IP",
      timestamp: "2024-01-15 11:30",
      type: "security",
      status: "warning",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4 text-blue-600" />
      case "project":
        return <FileText className="h-4 w-4 text-mustard-600" />
      case "system":
        return <Database className="h-4 w-4 text-green-600" />
      case "security":
        return <Shield className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-blue-800">Advanced Admin Features</h2>
        <p className="text-gray-600">System monitoring, bulk operations, and administrative tools</p>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Database</p>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(systemStatus.database)}
                  <span className="text-lg font-bold text-green-600">Healthy</span>
                </div>
              </div>
              <Database className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Server</p>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(systemStatus.server)}
                  <span className="text-lg font-bold text-green-600">Online</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Storage</p>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(systemStatus.storage)}
                  <span className="text-lg font-bold text-yellow-600">85% Full</span>
                </div>
              </div>
              <Database className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Backup</p>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(systemStatus.backup)}
                  <span className="text-lg font-bold text-green-600">Updated</span>
                </div>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">Bulk Operations</CardTitle>
            <CardDescription>Perform operations on multiple items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-blue-800 hover:bg-blue-700 text-white font-bold">
                <Users className="h-4 w-4 mr-2" />
                Bulk User Import
              </Button>
              <Button className="bg-mustard-600 hover:bg-mustard-700 text-blue-800 font-bold">
                <FileText className="h-4 w-4 mr-2" />
                Bulk Project Export
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Mail className="h-4 w-4 mr-2" />
                Send Notifications
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Generate Reports
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bulk-file">Upload CSV File</Label>
              <div className="flex items-center space-x-2">
                <Input id="bulk-file" type="file" accept=".csv" />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Process
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">System Maintenance</CardTitle>
            <CardDescription>System maintenance and optimization tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-bold">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh System Cache
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                <Database className="h-4 w-4 mr-2" />
                Optimize Database
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold">
                <Shield className="h-4 w-4 mr-2" />
                Run Security Scan
              </Button>
              <Button variant="outline" className="bg-transparent">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">Recent Activity Log</CardTitle>
          <CardDescription>Monitor all system activities and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-full">{getActivityIcon(activity.type)}</div>
                      <span className="font-medium text-gray-900">{activity.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>{activity.details}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {activity.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        activity.status === "success" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-800">127</div>
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-xs text-green-600">+12 this month</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-mustard-600">25</div>
            <p className="text-sm text-gray-600">Active Projects</p>
            <p className="text-xs text-blue-600">4 new this month</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-800">89</div>
            <p className="text-sm text-gray-600">Gallery Items</p>
            <p className="text-xs text-green-600">+15 this month</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-mustard-600">156</div>
            <p className="text-sm text-gray-600">Publications</p>
            <p className="text-xs text-blue-600">8 this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
