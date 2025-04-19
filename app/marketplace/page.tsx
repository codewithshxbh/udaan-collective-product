'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/product-card'
import { Search, Filter, ShoppingBag, Laptop, Book, ArrowRight, Globe, PlusCircle, Bookmark, Calendar, DollarSign, Users, Clock, TagIcon } from 'lucide-react'

// Sample resources data
const resources = [
  {
    id: 1,
    title: 'Professional Web Design Services',
    category: 'Services',
    type: 'Offering',
    provider: {
      name: 'Digital Literacy Foundation',
      type: 'NGO',
      verified: true
    },
    image: '/placeholder.svg',
    description: 'Complete web design services for NGOs including responsive layouts, accessibility features, and content management systems.',
    tags: ['Web Design', 'UI/UX', 'Accessibility'],
    price: 'Volunteer-based',
    location: 'Remote'
  },
  {
    id: 2,
    title: 'Office Space for Community Events',
    category: 'Spaces',
    type: 'Offering',
    provider: {
      name: 'Green Earth Initiative',
      type: 'NGO',
      verified: true
    },
    image: '/placeholder.svg',
    description: 'Available office space for community events, workshops, and small conferences. Capacity for up to 30 people with projector and WiFi.',
    tags: ['Event Space', 'Meeting Room', 'Central Location'],
    price: 'Free for NGOs',
    location: 'Delhi, India'
  },
  {
    id: 3,
    title: 'Professional Photography Equipment',
    category: 'Equipment',
    type: 'Offering',
    provider: {
      name: 'TechCorp Solutions',
      type: 'Company',
      verified: true
    },
    image: '/placeholder.svg',
    description: 'High-quality DSLR cameras, lenses, and lighting equipment available for short-term use by NGOs for event coverage and promotional content.',
    tags: ['Photography', 'Equipment', 'Media'],
    price: 'Subsidized Rates',
    location: 'Mumbai, India'
  },
  {
    id: 4,
    title: 'Graphic Design Volunteer Needed',
    category: 'Services',
    type: 'Request',
    provider: {
      name: 'Education For All',
      type: 'NGO',
      verified: true
    },
    image: '/placeholder.svg',
    description: 'We are looking for a skilled graphic designer to help create educational materials for our literacy program targeting rural children.',
    tags: ['Graphic Design', 'Educational Materials', 'Volunteer'],
    price: 'Volunteer Position',
    location: 'Hybrid'
  },
  {
    id: 5,
    title: 'Data Analysis Services',
    category: 'Services',
    type: 'Offering',
    provider: {
      name: 'Arjun Mehta',
      type: 'Individual',
      verified: true
    },
    image: '/placeholder.svg',
    description: 'Professional data analysis services including survey analysis, impact measurement, and outcome reporting for NGO programs.',
    tags: ['Data Analysis', 'Impact Measurement', 'Statistics'],
    price: 'Pro Bono / Reduced Rates',
    location: 'Remote'
  },
  {
    id: 6,
    title: 'Transportation Services for Medical Camps',
    category: 'Services',
    type: 'Request',
    provider: {
      name: 'Health For Communities',
      type: 'NGO',
      verified: false
    },
    image: '/placeholder.svg',
    description: 'We are seeking transportation services (vehicles and drivers) for our upcoming medical camps in rural areas over the next 3 months.',
    tags: ['Transportation', 'Medical Camps', 'Rural Outreach'],
    price: 'Paid Service',
    location: 'Bangalore Region, India'
  }
];

// Categories for filtering
const categories = [
  'All Categories',
  'Services',
  'Equipment',
  'Spaces',
  'Materials',
  'Technology',
  'Training',
  'Funding'
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeTab, setActiveTab] = useState('all');
  const [resourceType, setResourceType] = useState('all'); // 'all', 'offering', 'request'

  // Filter resources based on search, category, and type
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || resource.category === selectedCategory;
    
    const matchesType = resourceType === 'all' || 
                       (resourceType === 'offering' && resource.type === 'Offering') ||
                       (resourceType === 'request' && resource.type === 'Request');
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Filter resources based on active tab
  const displayedResources = activeTab === 'featured' 
    ? filteredResources.filter(resource => resource.provider.verified)
    : activeTab === 'nearby'
    ? filteredResources.filter(resource => resource.location.includes('Delhi')) // Example filtering for nearby
    : filteredResources;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Resource Marketplace
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Connect with organizations and individuals to share resources, services, and expertise for greater social impact.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search for resources, services, or equipment..."
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
                <div className="flex gap-2 mt-2">
                  <Button variant={resourceType === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setResourceType('all')}>All</Button>
                  <Button variant={resourceType === 'offering' ? 'default' : 'outline'} size="sm" onClick={() => setResourceType('offering')}>Offerings</Button>
                  <Button variant={resourceType === 'request' ? 'default' : 'outline'} size="sm" onClick={() => setResourceType('request')}>Requests</Button>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <img
                  alt="Resource sharing"
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
                  <h3 className="text-lg font-semibold mb-3">Have Resources to Share?</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    List your services, equipment, or space to support NGOs and contribute to social causes.
                  </p>
                  <Link href="/marketplace/create">
                    <Button className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      List a Resource
                    </Button>
                  </Link>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-3">Need Something?</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Post a request for resources, volunteers, or services needed for your projects.
                  </p>
                  <Link href="/marketplace/request">
                    <Button variant="outline" className="w-full">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Post a Request
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Resource Listings */}
              <div className="md:col-span-3 space-y-6">
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All Resources</TabsTrigger>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="nearby">Nearby</TabsTrigger>
                  </TabsList>
                  
                  {/* Tab contents share the same display logic, just filtered differently */}
                  <TabsContent value="all" className="mt-6">
                    {displayedResources.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedResources.map((resource) => (
                          <ProductCard
                            key={resource.id}
                            image={resource.image}
                            title={resource.title}
                            description={resource.description}
                            price={resource.price}
                            category={resource.category}
                            badge={
                              resource.type === 'Offering' 
                                ? <Badge className="absolute top-3 right-3 bg-green-500">Offering</Badge>
                                : <Badge className="absolute top-3 right-3 bg-blue-500">Request</Badge>
                            }
                            provider={resource.provider.name}
                            providerType={resource.provider.type}
                            verified={resource.provider.verified}
                            location={resource.location}
                            tags={resource.tags}
                            onViewDetails={() => {}}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No resources found matching your criteria</p>
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('All Categories');
                            setResourceType('all');
                          }}
                        >
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="featured" className="mt-6">
                    {displayedResources.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedResources.map((resource) => (
                          <ProductCard
                            key={resource.id}
                            image={resource.image}
                            title={resource.title}
                            description={resource.description}
                            price={resource.price}
                            category={resource.category}
                            badge={
                              resource.type === 'Offering' 
                                ? <Badge className="absolute top-3 right-3 bg-green-500">Offering</Badge>
                                : <Badge className="absolute top-3 right-3 bg-blue-500">Request</Badge>
                            }
                            provider={resource.provider.name}
                            providerType={resource.provider.type}
                            verified={resource.provider.verified}
                            location={resource.location}
                            tags={resource.tags}
                            onViewDetails={() => {}}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No featured resources found</p>
                        <Button 
                          variant="link" 
                          onClick={() => setActiveTab('all')}
                        >
                          View all resources
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="nearby" className="mt-6">
                    {displayedResources.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedResources.map((resource) => (
                          <ProductCard
                            key={resource.id}
                            image={resource.image}
                            title={resource.title}
                            description={resource.description}
                            price={resource.price}
                            category={resource.category}
                            badge={
                              resource.type === 'Offering' 
                                ? <Badge className="absolute top-3 right-3 bg-green-500">Offering</Badge>
                                : <Badge className="absolute top-3 right-3 bg-blue-500">Request</Badge>
                            }
                            provider={resource.provider.name}
                            providerType={resource.provider.type}
                            verified={resource.provider.verified}
                            location={resource.location}
                            tags={resource.tags}
                            onViewDetails={() => {}}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No nearby resources found</p>
                        <Button 
                          variant="link" 
                          onClick={() => setActiveTab('all')}
                        >
                          View all resources
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Browse by Category</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                  Explore resources by category to find exactly what you need for your projects.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-8 md:grid-cols-4">
              <Link href="/marketplace?category=Services" className="group">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 transition-colors group-hover:bg-amber-200">
                    <Users className="h-10 w-10 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold">Services</h3>
                  <p className="text-sm text-gray-500">
                    Professional services and expertise for your organization's needs.
                  </p>
                </div>
              </Link>
              <Link href="/marketplace?category=Equipment" className="group">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-200">
                    <Laptop className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Equipment</h3>
                  <p className="text-sm text-gray-500">
                    Hardware, tools, and equipment for events and projects.
                  </p>
                </div>
              </Link>
              <Link href="/marketplace?category=Spaces" className="group">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 transition-colors group-hover:bg-green-200">
                    <Calendar className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Spaces</h3>
                  <p className="text-sm text-gray-500">
                    Meeting rooms, event venues, and office spaces for your activities.
                  </p>
                </div>
              </Link>
              <Link href="/marketplace?category=Funding" className="group">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 transition-colors group-hover:bg-purple-200">
                    <DollarSign className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">Funding</h3>
                  <p className="text-sm text-gray-500">
                    Grants, sponsorships, and funding opportunities for NGOs.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                  Our marketplace connects those who have resources with those who need them.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <TagIcon className="h-8 w-8 text-amber-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">List or Request</h3>
                  <p className="text-gray-500">
                    List resources you can offer or post requests for what you need.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Connect</h3>
                  <p className="text-gray-500">
                    Connect with NGOs, companies, and individuals to collaborate.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <ShoppingBag className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Share Resources</h3>
                  <p className="text-gray-500">
                    Finalize arrangements and share resources for greater impact.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/marketplace/how-it-works">
                <Button variant="outline">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}