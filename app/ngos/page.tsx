'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ProfileCard } from '@/components/profile-card'
import { Search, Filter, MapPin, Users, Target, Globe, ArrowRight, Building } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

// Sample NGO data
const ngoData = [
  {
    id: 1,
    name: 'Education For All',
    logo: '/placeholder-logo.svg',
    location: 'Mumbai, India',
    category: 'Education',
    members: 28,
    description: 'Working to provide quality education to underprivileged children across rural India.',
    skills: ['Teaching', 'Curriculum Development', 'Fundraising'],
    verified: true
  },
  {
    id: 2,
    name: 'Green Earth Initiative',
    logo: '/placeholder-logo.svg',
    location: 'Delhi, India',
    category: 'Environment',
    members: 45,
    description: 'Focused on sustainable environmental practices and awareness programs for communities.',
    skills: ['Environmental Science', 'Community Outreach', 'Project Management'],
    verified: true
  },
  {
    id: 3,
    name: 'Health For Communities',
    logo: '/placeholder-logo.svg',
    location: 'Bangalore, India',
    category: 'Healthcare',
    members: 32,
    description: 'Providing healthcare services and education to underserved rural communities.',
    skills: ['Healthcare', 'Nursing', 'Medical Administration'],
    verified: false
  },
  {
    id: 4,
    name: 'Digital Literacy Foundation',
    logo: '/placeholder-logo.svg',
    location: 'Hyderabad, India',
    category: 'Technology',
    members: 19,
    description: 'Bridging the digital divide by providing computer education to rural and urban youth.',
    skills: ['Computer Training', 'Web Development', 'Digital Marketing'],
    verified: true
  },
  {
    id: 5,
    name: 'Women Empowerment Network',
    logo: '/placeholder-logo.svg',
    location: 'Chennai, India',
    category: 'Gender Equality',
    members: 41,
    description: 'Supporting women through skill development, entrepreneurship, and advocacy programs.',
    skills: ['Counseling', 'Entrepreneurship', 'Legal Advocacy'],
    verified: true
  },
  {
    id: 6,
    name: 'Clean Water Access',
    logo: '/placeholder-logo.svg',
    location: 'Pune, India',
    category: 'Water & Sanitation',
    members: 23,
    description: 'Implementing clean water solutions and sanitation awareness in rural communities.',
    skills: ['Water Engineering', 'Public Health', 'Community Engagement'],
    verified: false
  }
];

// Categories for filtering
const categories = [
  'All Categories',
  'Education',
  'Healthcare',
  'Environment',
  'Poverty Alleviation',
  'Technology',
  'Gender Equality',
  'Children & Youth',
  'Water & Sanitation'
];

export default function NGOsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeTab, setActiveTab] = useState('featured');
  const { user } = useAuth();
  const router = useRouter();

  // Filter NGOs based on search term and category
  const filteredNGOs = ngoData.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || ngo.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filter NGOs based on tab
  const displayedNGOs = activeTab === 'featured' 
    ? filteredNGOs.filter(ngo => ngo.verified)
    : activeTab === 'near-me'
    ? filteredNGOs.filter(ngo => ngo.location.includes('Mumbai')) // Example filtering for nearby
    : filteredNGOs;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Discover NGOs Making an Impact
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Connect with verified non-profit organizations working across various sectors to create positive social change.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search by name, cause, or location..."
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
              </div>
              <div className="mx-auto flex items-center justify-center aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <img
                  alt="NGOs working together"
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
                  <h3 className="text-lg font-semibold mb-3">Looking to register your NGO?</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Join our community of verified NGOs to connect with skilled individuals and resources.
                  </p>
                  <Link href="/ngos/register">
                    <Button className="w-full">
                      <Building className="mr-2 h-4 w-4" />
                      Register Your NGO
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* NGO Listings */}
              <div className="md:col-span-3 space-y-6">
                <Tabs defaultValue="featured" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="near-me">Near Me</TabsTrigger>
                    <TabsTrigger value="all">All NGOs</TabsTrigger>
                  </TabsList>
                  
                  {/* Tab contents share the same display logic, just filtered differently */}
                  <TabsContent value="featured" className="mt-6">
                    {displayedNGOs.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedNGOs.map((ngo) => (
                          <ProfileCard 
                            key={ngo.id}
                            image={ngo.logo}
                            title={ngo.name}
                            subtitle={ngo.category}
                            description={ngo.description}
                            tags={ngo.skills}
                            footer={
                              <div className="flex justify-between items-center w-full">
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="mr-1 h-4 w-4" />
                                  {ngo.location}
                                </div>
                                <Link href={`/ngos/${ngo.id}`}>
                                  <Button size="sm" variant="ghost">
                                    View
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                  </Button>
                                </Link>
                              </div>
                            }
                            badge={ngo.verified ? <Badge className="absolute top-3 right-3 bg-green-500">Verified</Badge> : null}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No NGOs found matching your criteria</p>
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('All Categories');
                          }}
                        >
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="near-me" className="mt-6">
                    {displayedNGOs.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedNGOs.map((ngo) => (
                          <ProfileCard 
                            key={ngo.id}
                            image={ngo.logo}
                            title={ngo.name}
                            subtitle={ngo.category}
                            description={ngo.description}
                            tags={ngo.skills}
                            footer={
                              <div className="flex justify-between items-center w-full">
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="mr-1 h-4 w-4" />
                                  {ngo.location}
                                </div>
                                <Link href={`/ngos/${ngo.id}`}>
                                  <Button size="sm" variant="ghost">
                                    View
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                  </Button>
                                </Link>
                              </div>
                            }
                            badge={ngo.verified ? <Badge className="absolute top-3 right-3 bg-green-500">Verified</Badge> : null}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No nearby NGOs found</p>
                        <Button 
                          variant="link" 
                          onClick={() => setActiveTab('all')}
                        >
                          View all NGOs
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="all" className="mt-6">
                    {displayedNGOs.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedNGOs.map((ngo) => (
                          <ProfileCard 
                            key={ngo.id}
                            image={ngo.logo}
                            title={ngo.name}
                            subtitle={ngo.category}
                            description={ngo.description}
                            tags={ngo.skills}
                            footer={
                              <div className="flex justify-between items-center w-full">
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="mr-1 h-4 w-4" />
                                  {ngo.location}
                                </div>
                                <Link href={`/ngos/${ngo.id}`}>
                                  <Button size="sm" variant="ghost">
                                    View
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                  </Button>
                                </Link>
                              </div>
                            }
                            badge={ngo.verified ? <Badge className="absolute top-3 right-3 bg-green-500">Verified</Badge> : null}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No NGOs found matching your criteria</p>
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('All Categories');
                          }}
                        >
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}