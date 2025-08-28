"\"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", users: 4000, content: 2400, gallery: 2400 },
  { name: "Feb", users: 3000, content: 1398, gallery: 2210 },
  { name: "Mar", users: 2000, content: 9800, gallery: 2290 },
  { name: "Apr", users: 2780, content: 3908, gallery: 2000 },
  { name: "May", users: 1890, content: 4800, gallery: 2181 },
  { name: "Jun", users: 2390, content: 3800, gallery: 2500 },
  { name: "Jul", users: 3490, content: 4300, gallery: 2100 },
]

export function Analytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-800">Website Analytics</CardTitle>
        <CardDescription>Monthly website statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#2E3192" name="Users" />
            <Bar dataKey="content" fill="#FDB913" name="Content" />
            <Bar dataKey="gallery" fill="#82ca9d" name="Gallery" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
\
"
