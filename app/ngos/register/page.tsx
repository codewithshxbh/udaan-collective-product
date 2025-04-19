"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Building, Upload, MapPin, Users, Phone, Mail, Globe, FileText, CheckCircle } from "lucide-react"

export default function NGORegistration() {
  const [activeStep, setActiveStep] = useState("organization")
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Registration logic would go here
    setRegisterSuccess(true)
  }

  if (registerSuccess) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Registration Successful!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500">
                Thank you for registering your NGO. Your submission has been received and is being reviewed. 
                You'll receive a confirmation email shortly.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => window.location.href = "/ngos/dashboard"}>
                Go to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">NGO Registration</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our platform to connect with skilled individuals and resources for your organization.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-4xl mt-8">
              <Tabs defaultValue="organization" className="w-full" onValueChange={setActiveStep}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="organization">Organization Details</TabsTrigger>
                  <TabsTrigger value="contact">Contact Information</TabsTrigger>
                  <TabsTrigger value="documents">Documents & Submit</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit}>
                  <TabsContent value="organization" className="p-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Organization Details</CardTitle>
                        <CardDescription>
                          Provide basic information about your NGO
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="ngo-name">NGO Name*</Label>
                          <Input id="ngo-name" placeholder="Enter your organization's full name" required />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="establishment-year">Year of Establishment*</Label>
                            <Input 
                              id="establishment-year" 
                              type="number" 
                              placeholder="YYYY" 
                              min="1900" 
                              max={new Date().getFullYear()}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="registration-number">Registration Number*</Label>
                            <Input id="registration-number" placeholder="Official registration number" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="primary-focus">Primary Focus Area*</Label>
                          <Select required>
                            <SelectTrigger id="primary-focus">
                              <SelectValue placeholder="Select primary focus area" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="environment">Environment</SelectItem>
                              <SelectItem value="poverty">Poverty Alleviation</SelectItem>
                              <SelectItem value="human-rights">Human Rights</SelectItem>
                              <SelectItem value="children">Children & Youth</SelectItem>
                              <SelectItem value="women">Women Empowerment</SelectItem>
                              <SelectItem value="disabilities">Disabilities</SelectItem>
                              <SelectItem value="animal">Animal Welfare</SelectItem>
                              <SelectItem value="disaster">Disaster Relief</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="secondary-focus">Secondary Focus Areas (Optional)</Label>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="education" />
                              <label htmlFor="education" className="text-sm">Education</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="healthcare" />
                              <label htmlFor="healthcare" className="text-sm">Healthcare</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="environment" />
                              <label htmlFor="environment" className="text-sm">Environment</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="poverty" />
                              <label htmlFor="poverty" className="text-sm">Poverty Alleviation</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="human-rights" />
                              <label htmlFor="human-rights" className="text-sm">Human Rights</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="children" />
                              <label htmlFor="children" className="text-sm">Children & Youth</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="women" />
                              <label htmlFor="women" className="text-sm">Women Empowerment</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="disabilities" />
                              <label htmlFor="disabilities" className="text-sm">Disabilities</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="animal" />
                              <label htmlFor="animal" className="text-sm">Animal Welfare</label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">About the Organization*</Label>
                          <Textarea 
                            id="description" 
                            placeholder="Briefly describe your NGO's mission, vision, and key activities (100-300 words)" 
                            className="min-h-[120px]"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="logo-upload">Organization Logo</Label>
                          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
                            <Building className="h-8 w-8 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">Upload your organization's logo</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG or SVG format (max 2MB)</p>
                            <Button variant="outline" size="sm" className="mt-4">
                              <Upload className="mr-2 h-4 w-4" />
                              Choose File
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">Save as Draft</Button>
                        <Button onClick={() => setActiveStep("contact")}>
                          Continue to Contact Information
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="contact" className="p-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>
                          Provide contact details for your organization
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Address Information</h3>
                          
                          <div className="space-y-2">
                            <Label htmlFor="address">Full Address*</Label>
                            <Textarea 
                              id="address" 
                              placeholder="Complete street address" 
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                              <Label htmlFor="city">City*</Label>
                              <Input id="city" placeholder="City" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State/Province*</Label>
                              <Input id="state" placeholder="State/Province" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pincode">Postal/PIN Code*</Label>
                              <Input id="pincode" placeholder="Postal/PIN code" required />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="country">Country*</Label>
                            <Select required>
                              <SelectTrigger id="country">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="india">India</SelectItem>
                                <SelectItem value="bangladesh">Bangladesh</SelectItem>
                                <SelectItem value="nepal">Nepal</SelectItem>
                                <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                                <SelectItem value="pakistan">Pakistan</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Contact Details</h3>
                          
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address*</Label>
                              <Input id="email" type="email" placeholder="organization@example.com" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number*</Label>
                              <Input id="phone" placeholder="Phone number with country code" required />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="website">Website (if any)</Label>
                              <Input id="website" type="url" placeholder="https://www.example.org" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="alternate-phone">Alternate Phone Number</Label>
                              <Input id="alternate-phone" placeholder="Alternate contact number" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Primary Contact Person</h3>
                          
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="contact-name">Full Name*</Label>
                              <Input id="contact-name" placeholder="Full name of primary contact person" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="designation">Designation*</Label>
                              <Input id="designation" placeholder="Title/Position in the organization" required />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="contact-email">Email Address*</Label>
                              <Input id="contact-email" type="email" placeholder="contact@example.com" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="contact-phone">Phone Number*</Label>
                              <Input id="contact-phone" placeholder="Contact person's phone number" required />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => setActiveStep("organization")}>
                          Back to Organization Details
                        </Button>
                        <Button onClick={() => setActiveStep("documents")}>
                          Continue to Documents
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="documents" className="p-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Documents & Verification</CardTitle>
                        <CardDescription>
                          Upload required documents to verify your NGO
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="rounded-lg border p-4">
                            <div className="flex items-start space-x-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <FileText className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold">Registration Certificate*</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  Upload your organization's official registration certificate
                                </p>
                                <div className="mt-3">
                                  <Button variant="outline" size="sm">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Document
                                  </Button>
                                  <p className="text-xs text-gray-400 mt-1">PDF or JPG format (max 5MB)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="rounded-lg border p-4">
                            <div className="flex items-start space-x-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <FileText className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold">Tax Exemption Certificate (if applicable)</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  Upload relevant tax exemption documents
                                </p>
                                <div className="mt-3">
                                  <Button variant="outline" size="sm">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Document
                                  </Button>
                                  <p className="text-xs text-gray-400 mt-1">PDF or JPG format (max 5MB)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="rounded-lg border p-4">
                            <div className="flex items-start space-x-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <FileText className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold">Annual Report (Most Recent)</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  Upload your organization's most recent annual report or activity summary
                                </p>
                                <div className="mt-3">
                                  <Button variant="outline" size="sm">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Document
                                  </Button>
                                  <p className="text-xs text-gray-400 mt-1">PDF format (max 10MB)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="rounded-lg border p-4">
                            <div className="flex items-start space-x-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <FileText className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold">Other Supporting Documents</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  Upload any additional documents to support your registration
                                </p>
                                <div className="mt-3">
                                  <Button variant="outline" size="sm">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Document
                                  </Button>
                                  <p className="text-xs text-gray-400 mt-1">PDF or JPG format (max 5MB each)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Terms & Conditions</h3>
                          
                          <div className="rounded-lg border bg-gray-50 p-4">
                            <div className="space-y-3">
                              <div className="flex items-start space-x-2">
                                <Checkbox id="terms" className="mt-1" required />
                                <label htmlFor="terms" className="text-sm">
                                  I confirm that all information provided is accurate and complete. I understand that providing false information may result in rejection or termination from the platform.*
                                </label>
                              </div>
                              <div className="flex items-start space-x-2">
                                <Checkbox id="data-policy" className="mt-1" required />
                                <label htmlFor="data-policy" className="text-sm">
                                  I agree to the platform's <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.*
                                </label>
                              </div>
                              <div className="flex items-start space-x-2">
                                <Checkbox id="updates" className="mt-1" />
                                <label htmlFor="updates" className="text-sm">
                                  I would like to receive updates about new features, opportunities, and events from The Udaan Collective.
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
                          <p className="text-sm text-orange-800">
                            <strong>Note:</strong> Your registration will be reviewed by our team for verification. This process typically takes 2-3 business days. You will receive an email notification once your registration is approved.
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => setActiveStep("contact")}>
                          Back to Contact Information
                        </Button>
                        <Button type="submit">
                          Submit Registration
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </form>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}