"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, CheckCircle2, FileText, Upload, Video, AlertCircle, Medal, Star, BookOpen, ArrowRight, Briefcase, Award } from "lucide-react"
import { Header } from "@/components/header"
import Link from "next/link"
import { ChallengeCard } from '@/components/challenge-card'
import { Search, Filter, CheckCircle, Clock, Shield, FileCheck } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function SkillsCertification() {
  const [activeTab, setActiveTab] = useState("overview")
  const [certificationProgress, setCertificationProgress] = useState(0)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [ngoAffiliation, setNgoAffiliation] = useState(false)
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [uploadMode, setUploadMode] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillDescription, setSkillDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Sample skill verification challenges
  const challenges = [
    {
      id: 1,
      title: 'JavaScript Programming Fundamentals',
      category: 'Web Development',
      difficulty: 'Beginner',
      timeRequired: '2 hours',
      description: 'Demonstrate your understanding of JavaScript fundamentals including variables, functions, loops, and basic DOM manipulation.',
      status: 'available'
    },
    {
      id: 2,
      title: 'React Component Architecture',
      category: 'Web Development',
      difficulty: 'Intermediate',
      timeRequired: '3 hours',
      description: 'Create a small React application with proper component hierarchy, state management, and props handling.',
      status: 'available'
    },
    {
      id: 3,
      title: 'Project Management Methodology',
      category: 'Management',
      difficulty: 'Intermediate',
      timeRequired: '2 hours',
      description: 'Demonstrate your knowledge of project management methodologies including Agile, Scrum, and traditional approaches.',
      status: 'available'
    },
    {
      id: 4,
      title: 'Content Writing & SEO',
      category: 'Marketing',
      difficulty: 'Beginner',
      timeRequired: '1.5 hours',
      description: 'Create content that is engaging, well-researched, and optimized for search engines.',
      status: 'available'
    },
    {
      id: 5,
      title: 'Financial Accounting Basics',
      category: 'Finance',
      difficulty: 'Intermediate',
      timeRequired: '2.5 hours',
      description: 'Demonstrate understanding of accounting principles, financial statements, and basic bookkeeping.',
      status: 'available'
    },
    {
      id: 6,
      title: 'Graphic Design Fundamentals',
      category: 'Design',
      difficulty: 'Beginner',
      timeRequired: '2 hours',
      description: 'Create visual designs that demonstrate your understanding of color theory, typography, and layout principles.',
      status: 'available'
    }
  ];

  // Sample completed verifications
  const completedVerifications = [
    {
      id: 101,
      skillName: 'Python Programming',
      category: 'Software Development',
      dateCompleted: 'March 10, 2025',
      score: 92,
      badge: 'Advanced',
      issuer: 'Education For All'
    },
    {
      id: 102,
      skillName: 'Social Media Marketing',
      category: 'Digital Marketing',
      dateCompleted: 'February 28, 2025',
      score: 88,
      badge: 'Intermediate',
      issuer: 'Digital Literacy Foundation'
    }
  ];

  // Sample verification requests
  const verificationRequests = [
    {
      id: 201,
      skillName: 'Database Management',
      category: 'IT Infrastructure',
      status: 'Under Review',
      submittedDate: 'April 10, 2025',
      reviewerNGO: 'Digital Literacy Foundation'
    }
  ];

  // Filter challenges based on search and category
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || challenge.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your verification request has been submitted.');
    setUploadMode(false);
    setSkillName('');
    setSkillDescription('');
    setSelectedFile(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50/50 to-transparent">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 animate-fadeIn">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gradient">Skills Certification</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Validate your expertise with modern skill certifications that showcase your abilities to companies and organizations.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-4xl">
              {activeTab !== "overview" && (
                <div className="mb-8 space-y-2">
                  <h2 className="text-lg font-medium">Certification Progress</h2>
                  <Progress value={certificationProgress} className="h-2 w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Profile</span>
                    <span>Assessment</span>
                    <span>Validation</span>
                    <span>Review</span>
                    <span>Certified</span>
                  </div>
                </div>
              )}

              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className={activeTab === "overview" ? "hidden" : "grid w-full grid-cols-4"}>
                  <TabsTrigger value="profile">Your Profile</TabsTrigger>
                  <TabsTrigger value="assessment">Skills Assessment</TabsTrigger>
                  <TabsTrigger value="validation">Validation</TabsTrigger>
                  <TabsTrigger value="review">Final Review</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-4 animate-fadeIn">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-center">Get Your Skills Certified</CardTitle>
                      <CardDescription className="text-center">
                        Showcase your skills with verified certifications that give you an edge in the marketplace
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl bg-blue-50/50 backdrop-blur-sm transition-smooth hover-scale">
                          <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Medal className="h-7 w-7" />
                          </div>
                          <h3 className="font-semibold text-lg">Trusted Certifications</h3>
                          <p className="text-sm text-muted-foreground">Industry-recognized certifications validated by experts</p>
                        </div>
                        
                        <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl bg-purple-50/50 backdrop-blur-sm transition-smooth hover-scale">
                          <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <Award className="h-7 w-7" />
                          </div>
                          <h3 className="font-semibold text-lg">Stand Out</h3>
                          <p className="text-sm text-muted-foreground">Differentiate yourself with verified skills that employers trust</p>
                        </div>
                        
                        <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl bg-amber-50/50 backdrop-blur-sm transition-smooth hover-scale">
                          <div className="h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                            <Briefcase className="h-7 w-7" />
                          </div>
                          <h3 className="font-semibold text-lg">Expand Opportunities</h3>
                          <p className="text-sm text-muted-foreground">Unlock new opportunities with verified credentials</p>
                        </div>
                      </div>
                      
                      <div className="mx-auto max-w-3xl rounded-xl border bg-card p-6">
                        <h3 className="text-xl font-semibold text-center mb-6">How It Works</h3>
                        
                        <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                              <span className="text-sm font-bold">1</span>
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-lg font-medium">Complete Your Profile</h4>
                              <p className="text-sm text-muted-foreground">
                                Fill in your professional details and the skills you want to get certified.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                              <span className="text-sm font-bold">2</span>
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-lg font-medium">Take Skill Assessments</h4>
                              <p className="text-sm text-muted-foreground">
                                Demonstrate your expertise through assessments tailored to your skill areas.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                              <span className="text-sm font-bold">3</span>
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-lg font-medium">Get Verified</h4>
                              <p className="text-sm text-muted-foreground">
                                NGO partners review and validate your skills based on your assessment results.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                              <span className="text-sm font-bold">4</span>
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-lg font-medium">Showcase Your Certification</h4>
                              <p className="text-sm text-muted-foreground">
                                Add your verified skills to your profile and share them with potential employers.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button size="lg" onClick={() => {
                        setActiveTab("profile");
                        setCertificationProgress(20);
                      }}>
                        Start Certification Process
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Additional TabsContent components would go here */}
              </Tabs>
            </div>

            <div className="mx-auto mt-8 max-w-3xl">
              {activeTab !== "ngo" && (
                <div className="mb-8 space-y-2">
                  <h2 className="text-lg font-medium">Verification Progress</h2>
                  <Progress value={verificationProgress} className="h-2 w-full" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>NGO</span>
                    <span>Identity</span>
                    <span>Skills</span>
                    <span>Review</span>
                    <span>Verified</span>
                  </div>
                </div>
              )}

              <Tabs defaultValue="ngo" className="w-full" onValueChange={setActiveTab}>
                <TabsList className={activeTab === "ngo" ? "hidden" : "grid w-full grid-cols-3"}>
                  <TabsTrigger value="identity">Identity Verification</TabsTrigger>
                  <TabsTrigger value="skills">Skills Verification</TabsTrigger>
                  <TabsTrigger value="review">Final Review</TabsTrigger>
                </TabsList>

                <TabsContent value="ngo" className="p-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>NGO Affiliation</CardTitle>
                      <CardDescription>
                        Confirm your affiliation with a registered NGO on our platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-start">
                          <div className="mr-3 mt-0.5">
                            <AlertCircle className="h-5 w-5 text-blue-600" />
                          </div>
                          <p className="text-sm text-blue-800">
                            <strong>Note:</strong> Skills verification is only available for individuals who are affiliated with NGOs registered on our platform. Companies and individual professionals seeking opportunities should register in their respective categories.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Select Your NGO</h3>
                        <div className="space-y-2">
                          <Label htmlFor="ngo-name">Affiliated NGO</Label>
                          <Select>
                            <SelectTrigger id="ngo-name">
                              <SelectValue placeholder="Select your NGO" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tech-for-change">Tech For Change</SelectItem>
                              <SelectItem value="education-first">Education First Foundation</SelectItem>
                              <SelectItem value="green-earth">Green Earth Initiative</SelectItem>
                              <SelectItem value="health-for-all">Health For All</SelectItem>
                              <SelectItem value="other">Other (Not Listed)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="role-in-ngo">Your Role in the NGO</Label>
                          <Input id="role-in-ngo" placeholder="e.g., Web Developer, Project Manager, Volunteer" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="ngo-email">NGO Email Address</Label>
                          <Input id="ngo-email" type="email" placeholder="Your email address at the NGO (if available)" />
                          <p className="text-xs text-gray-500">This helps us verify your affiliation with the NGO</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="ngo-contact-person">NGO Contact Person</Label>
                          <Input id="ngo-contact-person" placeholder="Name of person who can verify your affiliation" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="ngo-contact-email">Contact Person's Email</Label>
                          <Input id="ngo-contact-email" type="email" placeholder="Email of the NGO contact person" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="rounded-lg border bg-gray-50 p-4">
                          <div className="flex items-start space-x-2">
                            <input type="checkbox" id="ngo-confirmation" className="mt-1 h-4 w-4 rounded border-gray-300" />
                            <Label htmlFor="ngo-confirmation" className="text-sm">
                              I confirm that I am affiliated with the selected NGO and have permission to proceed with skills verification as their representative.
                            </Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={() => { 
                        setNgoAffiliation(true);
                        setActiveTab("identity");
                        setVerificationProgress(20);
                      }}>
                        Continue to Identity Verification
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="identity" className="p-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Provide your personal details for identity verification
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" placeholder="Your full legal name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="date-of-birth">Date of Birth</Label>
                            <Input id="date-of-birth" type="date" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Your email address" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" placeholder="Your phone number" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Current Address</Label>
                          <Textarea id="address" placeholder="Your current residential address" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">ID Verification</h3>
                        <div className="space-y-2">
                          <Label htmlFor="id-type">ID Type</Label>
                          <Select>
                            <SelectTrigger id="id-type">
                              <SelectValue placeholder="Select ID type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="passport">Passport</SelectItem>
                              <SelectItem value="driving-license">Driving License</SelectItem>
                              <SelectItem value="national-id">National ID Card</SelectItem>
                              <SelectItem value="voter-id">Voter ID</SelectItem>
                              <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="id-number">ID Number</Label>
                          <Input id="id-number" placeholder="Your ID number" />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label>ID Front Side</Label>
                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
                              <Upload className="h-8 w-8 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">Upload front side of your ID</p>
                              <Button variant="outline" size="sm" className="mt-4">
                                Choose File
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>ID Back Side</Label>
                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
                              <Upload className="h-8 w-8 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">Upload back side of your ID</p>
                              <Button variant="outline" size="sm" className="mt-4">
                                Choose File
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Profile Photo</h3>
                        <div className="flex items-center space-x-6">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src="/placeholder-user.jpg" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">Upload a clear photo of yourself for your profile</p>
                            <Button variant="outline" size="sm" className="mt-1">
                              <Camera className="mr-2 h-4 w-4" />
                              Upload Photo
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => {
                        setActiveTab("ngo");
                        setVerificationProgress(0);
                      }}>
                        Back to NGO Selection
                      </Button>
                      <Button onClick={() => { 
                        setActiveTab("skills");
                        setVerificationProgress(40);
                      }}>
                        Continue to Skills Verification
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="p-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills Assessment</CardTitle>
                      <CardDescription>
                        Provide details about your skills and choose verification methods
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Professional Skills</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="primary-skill">Primary Skill Category</Label>
                            <Select>
                              <SelectTrigger id="primary-skill">
                                <SelectValue placeholder="Select skill category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tech">Technology</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="management">Management</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="experience-years">Years of Experience</Label>
                            <Select>
                              <SelectTrigger id="experience-years">
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-1">0-1 years</SelectItem>
                                <SelectItem value="1-3">1-3 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="5-10">5-10 years</SelectItem>
                                <SelectItem value="10+">10+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specific-skills">Specific Skills</Label>
                          <Input id="specific-skills" placeholder="e.g., JavaScript, React, Node.js" />
                          <p className="text-xs text-gray-500">Enter skills separated by commas</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ngo-relevance">Relevance to NGO Work</Label>
                          <Textarea 
                            id="ngo-relevance" 
                            placeholder="Explain how these skills are relevant to your work at the NGO"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="skill-description">Describe Your Experience</Label>
                          <Textarea id="skill-description" placeholder="Briefly describe your experience with these skills" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Skill Verification Methods</h3>
                        <p className="text-sm text-gray-500">
                          Choose at least one method to verify your skills
                        </p>
                        
                        <div className="space-y-4">
                          <div className="rounded-lg border p-4">
                            <div className="flex items-start space-x-4">
                              <input type="checkbox" id="video-verification" className="mt-1 h-4 w-4 rounded border-gray-300" />
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <Label htmlFor="video-verification" className="text-base font-medium">Live Video Verification</Label>
                                  <Badge className="ml-2">Recommended</Badge>
                                </div>
                                <p className="text-sm text-gray-500">
                                  Schedule a live video session to demonstrate your skills. We use Jitsi Meet, a free and secure video conferencing tool.
                                </p>
                                <Button variant="outline" size="sm" className="mt-1">
                                  <Video className="mr-2 h-4 w-4" />
                                  Schedule Video Session
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="rounded-lg border p-4">
                            <div className="flex items-start space-x-4">
                              <input type="checkbox" id="assessment-form" className="mt-1 h-4 w-4 rounded border-gray-300" />
                              <div className="space-y-2">
                                <Label htmlFor="assessment-form" className="text-base font-medium">Skill Assessment Form</Label>
                                <p className="text-sm text-gray-500">
                                  Complete a detailed assessment form to evaluate your knowledge and experience. Administered through Google Forms.
                                </p>
                                <Button variant="outline" size="sm" className="mt-1">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Take Assessment
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="rounded-lg border p-4">
                            <div className="flex items-start space-x-4">
                              <input type="checkbox" id="portfolio-upload" className="mt-1 h-4 w-4 rounded border-gray-300" />
                              <div className="space-y-2">
                                <Label htmlFor="portfolio-upload" className="text-base font-medium">Portfolio/Work Samples</Label>
                                <p className="text-sm text-gray-500">
                                  Upload examples of your work that demonstrate your skills and experience.
                                </p>
                                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4 mt-2">
                                  <Upload className="h-6 w-6 text-gray-400" />
                                  <p className="mt-2 text-sm text-gray-500">Upload work samples (PDF, images, or links)</p>
                                  <Button variant="outline" size="sm" className="mt-3">
                                    Choose Files
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => {
                        setActiveTab("identity");
                        setVerificationProgress(20);
                      }}>
                        Back to Identity
                      </Button>
                      <Button onClick={() => {
                        setActiveTab("review");
                        setVerificationProgress(70);
                      }}>
                        Continue to Review
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="review" className="p-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Review & Submit</CardTitle>
                      <CardDescription>
                        Review your information before final submission
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">NGO Affiliation</h3>
                          <Badge variant="outline" className="bg-green-50 text-green-600">Verified</Badge>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">NGO Name</h4>
                              <p>Tech For Change</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Your Role</h4>
                              <p>Web Developer</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Identity Verification</h3>
                          <Badge variant="outline" className="bg-green-50 text-green-600">Completed</Badge>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                              <p>Ravi Kumar</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
                              <p>15 May 1992</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">ID Type</h4>
                              <p>Aadhaar Card</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">ID Number</h4>
                              <p>XXXX-XXXX-1234</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Skills Verification</h3>
                          <Badge variant="outline" className="bg-green-50 text-green-600">Completed</Badge>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Primary Skill Category</h4>
                              <p>Technology</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Specific Skills</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <Badge variant="secondary">JavaScript</Badge>
                                <Badge variant="secondary">React</Badge>
                                <Badge variant="secondary">Node.js</Badge>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Relevance to NGO</h4>
                              <p>Building tools for educational outreach and internal organization</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Verification Methods</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <div className="flex items-center">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" />
                                  <span className="text-sm">Live Video Session Scheduled</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Consent & Declaration</h3>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <input type="checkbox" id="consent" className="mt-1 h-4 w-4 rounded border-gray-300" />
                            <Label htmlFor="consent" className="text-sm">
                              I confirm that all information provided is accurate and complete. I understand that providing false information may result in rejection or revocation of my verification status.
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <input type="checkbox" id="data-consent" className="mt-1 h-4 w-4 rounded border-gray-300" />
                            <Label htmlFor="data-consent" className="text-sm">
                              I consent to the processing of my personal data for the purpose of skills verification, in accordance with the Privacy Policy.
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <input type="checkbox" id="ngo-confirmation" className="mt-1 h-4 w-4 rounded border-gray-300" />
                            <Label htmlFor="ngo-confirmation" className="text-sm">
                              I confirm that I am affiliated with the stated NGO and have permission to represent myself as their team member.
                            </Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => {
                        setActiveTab("skills");
                        setVerificationProgress(40);
                      }}>
                        Back to Skills
                      </Button>
                      <Button onClick={() => setVerificationProgress(100)}>
                        Submit Verification Request
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Verify Your Skills
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get your skills certified by trusted NGOs and showcase your verified credentials to potential employers and partners.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button 
                    size="lg" 
                    className="h-12"
                    onClick={() => setActiveTab('challenges')}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Browse Challenges
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-12"
                    onClick={() => {
                      setActiveTab('upload');
                      setUploadMode(true);
                    }}
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Certificate
                  </Button>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <img
                  alt="Skills Verification"
                  className="aspect-video object-cover rounded-xl"
                  height="350"
                  src="/placeholder.svg"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <Tabs 
              defaultValue="challenges" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="upload">Upload Certificate</TabsTrigger>
                <TabsTrigger value="verified">My Verified Skills</TabsTrigger>
              </TabsList>
              
              {/* Challenges Tab */}
              <TabsContent value="challenges" className="mt-6">
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search challenges by name or description..."
                      className="w-full pl-8 rounded-md border-gray-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-64">
                    <select 
                      className="w-full h-10 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option>All Categories</option>
                      <option>Web Development</option>
                      <option>Management</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>Design</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      title={challenge.title}
                      category={challenge.category}
                      difficulty={challenge.difficulty}
                      timeRequired={challenge.timeRequired}
                      description={challenge.description}
                      onStart={() => alert(`Starting challenge: ${challenge.title}`)}
                    />
                  ))}
                </div>
                
                {filteredChallenges.length === 0 && (
                  <div className="text-center py-12">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-xl font-semibold">No challenges found</h3>
                    <p className="mt-1 text-gray-500">
                      Try adjusting your search or filter to find challenges.
                    </p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('All Categories');
                      }}
                      className="mt-4"
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              {/* Upload Certificate Tab */}
              <TabsContent value="upload" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Skill Certificate</CardTitle>
                    <CardDescription>
                      Already have a certificate from another platform? Upload it for verification by our partner NGOs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmission} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="skill-name">Skill Name</Label>
                        <Input 
                          id="skill-name" 
                          placeholder="E.g., Java Programming, Digital Marketing, etc."
                          value={skillName}
                          onChange={(e) => setSkillName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="skill-description">Skill Description</Label>
                        <Textarea 
                          id="skill-description" 
                          placeholder="Briefly describe your skill and experience level..."
                          value={skillDescription}
                          onChange={(e) => setSkillDescription(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="certificate">Certificate Upload</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Input 
                            id="certificate" 
                            type="file" 
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                          <label 
                            htmlFor="certificate" 
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <Upload className="mb-2 h-8 w-8 text-gray-400" />
                            <span className="text-sm font-medium">
                              {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              PDF, JPG, or PNG (max. 5MB)
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit" disabled={!skillName || !skillDescription || !selectedFile}>
                          <FileCheck className="mr-2 h-4 w-4" />
                          Submit for Verification
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Verified Skills Tab */}
              <TabsContent value="verified" className="mt-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {/* Left Column: List of Verified Skills */}
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Verified Skills</h3>
                    {completedVerifications.length > 0 ? (
                      <div className="space-y-4">
                        {completedVerifications.map((verification) => (
                          <Card key={verification.id}>
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center mb-2">
                                    <h4 className="text-lg font-semibold mr-2">{verification.skillName}</h4>
                                    <Badge className="bg-green-500">{verification.badge}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-500 mb-1">Category: {verification.category}</p>
                                  <p className="text-sm text-gray-500 mb-1">Verified by: {verification.issuer}</p>
                                  <p className="text-sm text-gray-500">
                                    Completed on: {verification.dateCompleted}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-purple-600">{verification.score}%</div>
                                  <div className="text-xs text-gray-500">Score</div>
                                </div>
                              </div>
                              <div className="mt-4 flex justify-end">
                                <Button variant="outline" size="sm">
                                  <Award className="mr-1 h-4 w-4" />
                                  View Certificate
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center">
                          <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <h4 className="text-lg font-semibold mb-2">No Verified Skills Yet</h4>
                          <p className="text-gray-500 mb-4">
                            Take skill verification challenges to earn badges and showcase your abilities.
                          </p>
                          <Button onClick={() => setActiveTab('challenges')}>
                            Browse Challenges
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Pending Verification Requests */}
                    {verificationRequests.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Pending Verification Requests</h3>
                        <div className="space-y-4">
                          {verificationRequests.map((request) => (
                            <Card key={request.id}>
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="text-lg font-semibold mb-2">{request.skillName}</h4>
                                    <p className="text-sm text-gray-500 mb-1">Category: {request.category}</p>
                                    <p className="text-sm text-gray-500 mb-1">Submitted on: {request.submittedDate}</p>
                                    <p className="text-sm text-gray-500">Reviewer: {request.reviewerNGO}</p>
                                  </div>
                                  <div>
                                    <Badge className="bg-yellow-500 flex items-center">
                                      <Clock className="mr-1 h-3 w-3" />
                                      {request.status}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Right Column: Sidebar */}
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Skill Verification Benefits</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <p className="text-sm">Verified skills increase your visibility to potential employers</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <p className="text-sm">Verification by reputable NGOs adds credibility to your profile</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <p className="text-sm">Skill badges can be shared on your resume and social profiles</p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <p className="text-sm">Access to exclusive opportunities from our partner NGOs</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full"
                          onClick={() => setActiveTab('challenges')}
                        >
                          Get Verified Today
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}