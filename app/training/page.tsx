"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  BookOpen, 
  GraduationCap, 
  Play, 
  Search, 
  Star, 
  Award, 
  Trophy, 
  CheckCircle, 
  Clock, 
  Calendar,
  Bookmark,
  Youtube,
  ExternalLink,
  Filter,
  Users,
  ArrowRight
} from "lucide-react"
import { Header } from "@/components/header"

// Sample training course data
const courses = [
  {
    id: 1,
    title: 'NGO Financial Management',
    category: 'Management',
    level: 'Intermediate',
    duration: '8 hours',
    provider: 'TechCorp Academy',
    rating: 4.8,
    students: 1245,
    image: '/placeholder.svg',
    description: 'Learn financial management principles specifically tailored for non-profit organizations including budgeting, accounting, and reporting.',
    tags: ['Financial Management', 'Budgeting', 'Accounting'],
    free: true,
    featured: true
  },
  {
    id: 2,
    title: 'Effective Fundraising Strategies',
    category: 'Fundraising',
    level: 'Beginner',
    duration: '6 hours',
    provider: 'NGO Success Academy',
    rating: 4.6,
    students: 1876,
    image: '/placeholder.svg',
    description: 'Discover proven strategies to improve your fundraising efforts, from grant writing to digital campaigns and donor management.',
    tags: ['Fundraising', 'Donor Management', 'Grant Writing'],
    free: true,
    featured: true
  },
  {
    id: 3,
    title: 'Project Management for Social Impact',
    category: 'Management',
    level: 'Intermediate',
    duration: '10 hours',
    provider: 'Impact Institute',
    rating: 4.7,
    students: 987,
    image: '/placeholder.svg',
    description: 'Master project management methodologies adapted for social impact initiatives, covering planning, execution, monitoring, and evaluation.',
    tags: ['Project Management', 'Impact Measurement', 'Agile'],
    free: false,
    featured: true
  },
  {
    id: 4,
    title: 'Digital Marketing for NGOs',
    category: 'Marketing',
    level: 'Beginner',
    duration: '5 hours',
    provider: 'Digital Outreach',
    rating: 4.5,
    students: 2134,
    image: '/placeholder.svg',
    description: 'Learn how to effectively use digital marketing channels to promote your cause, engage supporters, and increase visibility.',
    tags: ['Digital Marketing', 'Social Media', 'Content Strategy'],
    free: true,
    featured: false
  },
  {
    id: 5,
    title: 'Community Engagement Principles',
    category: 'Community',
    level: 'Beginner',
    duration: '4 hours',
    provider: 'Grassroots Learning',
    rating: 4.4,
    students: 756,
    image: '/placeholder.svg',
    description: 'Develop skills to effectively engage with communities, build trust, and create participatory programs that address local needs.',
    tags: ['Community Building', 'Stakeholder Engagement', 'Participatory Methods'],
    free: true,
    featured: false
  },
  {
    id: 6,
    title: 'Advanced Grant Writing',
    category: 'Fundraising',
    level: 'Advanced',
    duration: '12 hours',
    provider: 'Grant Success Partners',
    rating: 4.9,
    students: 645,
    image: '/placeholder.svg',
    description: 'Master the art of writing compelling grant proposals with advanced techniques to increase your success rate with institutional donors.',
    tags: ['Grant Writing', 'Proposal Development', 'Donor Research'],
    free: false,
    featured: true
  }
];

// Categories for filtering
const categories = [
  'All Categories',
  'Management',
  'Fundraising',
  'Marketing',
  'Technology',
  'Community',
  'Advocacy',
  'Leadership'
];

// Levels for filtering
const levels = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
];

export default function Training() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Filter courses based on search, category, level, and free/paid
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    
    const matchesFree = !showFreeOnly || course.free;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesFree;
  });

  // Filter courses based on active tab
  const displayedCourses = activeTab === 'featured' 
    ? filteredCourses.filter(course => course.featured)
    : activeTab === 'popular'
    ? filteredCourses.sort((a, b) => b.students - a.students).slice(0, 6)
    : filteredCourses;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Learning for Impact
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Free and affordable courses to help NGOs, volunteers, and social entrepreneurs build skills for greater impact.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search for courses, skills, or topics..."
                      className="w-full pl-8 rounded-md border-gray-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button className="shrink-0">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="free-only" 
                      className="h-4 w-4 rounded border-gray-300" 
                      checked={showFreeOnly}
                      onChange={() => setShowFreeOnly(!showFreeOnly)}
                    />
                    <label htmlFor="free-only" className="text-sm">Free courses only</label>
                  </div>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <img
                  alt="Online learning"
                  className="aspect-video object-cover rounded-xl"
                  height="350"
                  src="/placeholder.svg"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* Sidebar with Filters */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <Button 
                          variant={selectedCategory === category ? "default" : "ghost"} 
                          className="w-full justify-start text-left"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-3">Level</h3>
                  <div className="space-y-3">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center">
                        <Button 
                          variant={selectedLevel === level ? "default" : "ghost"} 
                          className="w-full justify-start text-left"
                          onClick={() => setSelectedLevel(level)}
                        >
                          {level}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-3">Are You an Expert?</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Share your knowledge and help others by creating a course or workshop.
                  </p>
                  <Link href="/training/teach">
                    <Button className="w-full">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Become an Instructor
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Course Listings */}
              <div className="md:col-span-3 space-y-6">
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All Courses</TabsTrigger>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="popular">Most Popular</TabsTrigger>
                  </TabsList>
                  
                  {/* Tab contents share the same display logic, just filtered differently */}
                  <TabsContent value="all" className="mt-6">
                    {displayedCourses.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedCourses.map((course) => (
                          <Link href={`/training/course/${course.id}`} key={course.id}>
                            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                              <div className="aspect-video relative overflow-hidden">
                                <img
                                  src={course.image}
                                  alt={course.title}
                                  className="object-cover w-full h-full"
                                />
                                {course.free && (
                                  <Badge className="absolute top-3 left-3 bg-green-500">Free</Badge>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Button size="sm" variant="secondary" className="gap-1">
                                    <Play className="h-4 w-4" />
                                    Preview
                                  </Button>
                                </div>
                              </div>
                              <CardContent className="p-4">
                                <div className="mb-2">
                                  <Badge variant="outline" className="text-xs mr-2">
                                    {course.category}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {course.level}
                                  </Badge>
                                </div>
                                <h3 className="text-lg font-semibold line-clamp-2 mb-1">{course.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{course.description}</p>
                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                    {course.duration}
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1 text-gray-400" />
                                    {course.students.toLocaleString()}
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                                    {course.rating}
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-2">
                                <div className="text-sm">{course.provider}</div>
                                <Button variant="ghost" size="sm">
                                  View Course
                                  <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                              </CardFooter>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No courses found matching your criteria</p>
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('All Categories');
                            setSelectedLevel('All Levels');
                            setShowFreeOnly(false);
                          }}
                        >
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="featured" className="mt-6">
                    {displayedCourses.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedCourses.map((course) => (
                          <Link href={`/training/course/${course.id}`} key={course.id}>
                            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                              <div className="aspect-video relative overflow-hidden">
                                <img
                                  src={course.image}
                                  alt={course.title}
                                  className="object-cover w-full h-full"
                                />
                                {course.free && (
                                  <Badge className="absolute top-3 left-3 bg-green-500">Free</Badge>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Button size="sm" variant="secondary" className="gap-1">
                                    <Play className="h-4 w-4" />
                                    Preview
                                  </Button>
                                </div>
                              </div>
                              <CardContent className="p-4">
                                <div className="mb-2">
                                  <Badge variant="outline" className="text-xs mr-2">
                                    {course.category}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {course.level}
                                  </Badge>
                                </div>
                                <h3 className="text-lg font-semibold line-clamp-2 mb-1">{course.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{course.description}</p>
                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                    {course.duration}
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1 text-gray-400" />
                                    {course.students.toLocaleString()}
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                                    {course.rating}
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-2">
                                <div className="text-sm">{course.provider}</div>
                                <Button variant="ghost" size="sm">
                                  View Course
                                  <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                              </CardFooter>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No featured courses found</p>
                        <Button 
                          variant="link" 
                          onClick={() => setActiveTab('all')}
                        >
                          View all courses
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="popular" className="mt-6">
                    {displayedCourses.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedCourses.map((course) => (
                          <Link href={`/training/course/${course.id}`} key={course.id}>
                            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                              <div className="aspect-video relative overflow-hidden">
                                <img
                                  src={course.image}
                                  alt={course.title}
                                  className="object-cover w-full h-full"
                                />
                                {course.free && (
                                  <Badge className="absolute top-3 left-3 bg-green-500">Free</Badge>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Button size="sm" variant="secondary" className="gap-1">
                                    <Play className="h-4 w-4" />
                                    Preview
                                  </Button>
                                </div>
                              </div>
                              <CardContent className="p-4">
                                <div className="mb-2">
                                  <Badge variant="outline" className="text-xs mr-2">
                                    {course.category}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {course.level}
                                  </Badge>
                                </div>
                                <h3 className="text-lg font-semibold line-clamp-2 mb-1">{course.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{course.description}</p>
                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                    {course.duration}
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1 text-gray-400" />
                                    {course.students.toLocaleString()}
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                                    {course.rating}
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-2">
                                <div className="text-sm">{course.provider}</div>
                                <Button variant="ghost" size="sm">
                                  View Course
                                  <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                              </CardFooter>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No popular courses found</p>
                        <Button 
                          variant="link" 
                          onClick={() => setActiveTab('all')}
                        >
                          View all courses
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Paths Section */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Learning Paths</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                  Structured course collections to develop comprehensive skills for your role.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 md:grid-cols-3">
              <Card className="group">
                <CardHeader className="pb-3">
                  <div className="mb-2 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle>NGO Leadership</CardTitle>
                  <CardDescription>Master essential leadership skills for running effective non-profits</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Strategic Planning</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Team Management</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Financial Oversight</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Governance & Ethics</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Award className="mr-2 h-4 w-4" />
                    Start Learning Path
                  </Button>
                </CardFooter>
              </Card>
              <Card className="group">
                <CardHeader className="pb-3">
                  <div className="mb-2 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-colors">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle>Fundraising Specialist</CardTitle>
                  <CardDescription>Become an expert in securing funding and donations</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Grant Writing</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Digital Fundraising</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Donor Relations</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Event Planning</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Award className="mr-2 h-4 w-4" />
                    Start Learning Path
                  </Button>
                </CardFooter>
              </Card>
              <Card className="group">
                <CardHeader className="pb-3">
                  <div className="mb-2 h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-200 transition-colors">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle>Digital Skills</CardTitle>
                  <CardDescription>Essential digital skills for modern non-profit organizations</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Social Media Management</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Content Creation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Analytics & Reporting</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Digital Tools for NGOs</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Award className="mr-2 h-4 w-4" />
                    Start Learning Path
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="flex justify-center mt-4">
              <Link href="/training/learning-paths">
                <Button variant="outline">
                  View All Learning Paths
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Success Stories</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                  Hear from organizations that have transformed their work through our training.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-2">
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="italic text-gray-600">
                      "The fundraising courses helped us increase our donation revenue by 65% in just six months. The strategies were practical and easy to implement even with our small team."
                    </p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                      <div>
                        <p className="font-medium">Priya Sharma</p>
                        <p className="text-sm text-gray-500">Director, Education For All</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="italic text-gray-600">
                      "The project management learning path transformed how we run our community initiatives. We're now able to serve 40% more people with the same resources thanks to improved efficiency."
                    </p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                      <div>
                        <p className="font-medium">Raj Mehta</p>
                        <p className="text-sm text-gray-500">Program Manager, Green Earth Initiative</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}