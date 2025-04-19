'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import ProtectedRoute from '@/components/protected-route';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, ShoppingBag, BarChart4, Clock, Plus } from 'lucide-react';
import Link from 'next/link';

export default function NGODashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    verifiedMembers: 0,
    pendingMembers: 0,
    resourceRequests: 0,
    projectsActive: 0
  });

  // Simulated data fetch - in a real app, you would fetch from your API
  useEffect(() => {
    // Mock data - replace with real API call
    setStats({
      verifiedMembers: 24,
      pendingMembers: 7,
      resourceRequests: 12,
      projectsActive: 5
    });
  }, []);

  return (
    <ProtectedRoute userTypes={['ngo']}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">NGO Dashboard</h1>
                <p className="text-gray-500 mt-1">
                  Manage your NGO profile, team members, and resource requests
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Team Member
                </Button>
                <Button className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  New Resource Request
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Verified Members</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.verifiedMembers}</div>
                  <p className="text-xs text-gray-500">
                    +2 since last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                  <Clock className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingMembers}</div>
                  <p className="text-xs text-gray-500">
                    Requires your attention
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Resource Requests</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.resourceRequests}</div>
                  <p className="text-xs text-gray-500">
                    5 approved, 7 pending
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <BarChart4 className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.projectsActive}</div>
                  <p className="text-xs text-gray-500">
                    2 completed this month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* NGO Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle>NGO Profile</CardTitle>
                <CardDescription>
                  Your organization's public profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/4">
                    <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                  <div className="w-full md:w-3/4 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{user?.name || 'Your NGO Name'}</h3>
                      <p className="text-sm text-gray-500">{user?.email || 'ngo@example.org'}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p>Mumbai, Maharashtra</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Founded</p>
                          <p>2015</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Focus Areas</p>
                          <p>Education, Healthcare, Women Empowerment</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Team Size</p>
                          <p>25-50 members</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Members Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage your team and their verification status
                  </CardDescription>
                </div>
                <Button size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm font-medium text-gray-500 border-b">
                    <div>Name</div>
                    <div>Role</div>
                    <div>Skills</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm items-center">
                      <div className="font-medium">Priya Sharma</div>
                      <div>Program Manager</div>
                      <div>
                        <div className="flex flex-wrap gap-1">
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            Management
                          </span>
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                            Education
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          Verified
                        </span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm items-center">
                      <div className="font-medium">Rahul Patel</div>
                      <div>Healthcare Specialist</div>
                      <div>
                        <div className="flex flex-wrap gap-1">
                          <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                            Healthcare
                          </span>
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                            Community
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                          Pending
                        </span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm items-center">
                      <div className="font-medium">Amit Khanna</div>
                      <div>Tech Volunteer</div>
                      <div>
                        <div className="flex flex-wrap gap-1">
                          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                            Technology
                          </span>
                          <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                            Web Dev
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          Verified
                        </span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}