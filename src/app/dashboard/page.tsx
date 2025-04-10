"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { QrCode, Users, Clock, BarChart3, Calendar, Settings, Bell, Search, Menu } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardPage() {
  const { userData } = useAuth()
  const [greeting, setGreeting] = useState("Good day")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar collapsible="offcanvas">
            <SidebarHeader className="flex items-center justify-between p-4">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <QrCode className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">I&apos;m Here</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link href="/dashboard">
                      <BarChart3 className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/attendance">
                      <Clock className="h-5 w-5" />
                      <span>Attendance</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/calendar">
                      <Calendar className="h-5 w-5" />
                      <span>Calendar</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/users">
                      <Users className="h-5 w-5" />
                      <span>Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-4">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">{userData?.firstName?.charAt(0) || "U"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {userData?.firstName} {userData?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{userData?.email}</p>
                </div>
              </div>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>

          <div className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="flex flex-col gap-6 max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden h-10 w-10 rounded-full bg-primary/5 hover:bg-primary/10 text-primary"
                    asChild
                  >
                    <SidebarTrigger>
                      <Menu className="h-5 w-5" />
                    </SidebarTrigger>
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                      {greeting}, {userData?.firstName || "User"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Here&apos;s what&apos;s happening with your attendance today.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative hidden sm:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search..." className="w-[240px] pl-8" />
                  </div>
                  <Button size="icon" variant="outline" className="shrink-0 rounded-full h-10 w-10">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Notifications</span>
                  </Button>
                </div>
              </div>

              <div className="sm:hidden mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="w-full pl-8" />
                </div>
              </div>

              <Tabs defaultValue="overview" className="space-y-6">
                <div className="overflow-auto pb-1">
                  <TabsList className="inline-flex h-10">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview" className="space-y-6 mt-0">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+2 from last week</p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Next class in 45 minutes</p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">248</div>
                        <p className="text-xs text-muted-foreground">+18.2% from last week</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-6 md:grid-cols-7">
                    <Card className="md:col-span-4 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle>Weekly Attendance Overview</CardTitle>
                        <CardDescription>Your attendance statistics for the past week</CardDescription>
                      </CardHeader>
                      <CardContent className="pl-2">
                        <div className="h-[200px] sm:h-[280px] flex items-center justify-center bg-muted/20 rounded-md">
                          <p className="text-muted-foreground">Attendance chart will appear here</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="md:col-span-3 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle>Upcoming Classes</CardTitle>
                        <CardDescription>Your schedule for today</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              title: "Mathematics 101",
                              time: "10:00 AM - 11:30 AM",
                              location: "Room 204",
                            },
                            {
                              title: "Computer Science",
                              time: "1:00 PM - 2:30 PM",
                              location: "Lab 3",
                            },
                            {
                              title: "Physics",
                              time: "3:00 PM - 4:30 PM",
                              location: "Room 105",
                            },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center">
                              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                <Clock className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.time}</p>
                                <p className="text-xs text-muted-foreground">{item.location}</p>
                              </div>
                              <Button variant="outline" size="sm" className="shrink-0">
                                Check in
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View All Classes
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6 mt-0">
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>Attendance Analytics</CardTitle>
                      <CardDescription>Detailed analytics of your attendance patterns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px] sm:h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                        <p className="text-muted-foreground">Analytics charts will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reports" className="space-y-6 mt-0">
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>Attendance Reports</CardTitle>
                      <CardDescription>Download and view your attendance reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-3 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <BarChart3 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Monthly Attendance Report</p>
                              <p className="text-sm text-muted-foreground">March 2024</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="sm:self-center">
                            Download
                          </Button>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-3 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <BarChart3 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Semester Attendance Report</p>
                              <p className="text-sm text-muted-foreground">Spring 2024</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="sm:self-center">
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
