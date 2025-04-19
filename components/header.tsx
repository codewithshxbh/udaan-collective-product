"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Award, Bell, Menu, Search, ShoppingBag, X, HeartHandshake, GraduationCap, Briefcase, Building, UserCheck, LogIn } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  
  const handleLogout = () => {
    logout()
    router.push('/')
  }
  
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "U"
    const names = name.split(' ')
    if (names.length === 1) return names[0].charAt(0).toUpperCase()
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }
  
  // Determine where to redirect based on user type
  const getDashboardLink = () => {
    if (!user) return '/'
    
    switch (user.user_type) {
      case 'ngo':
        return '/ngos/dashboard'
      case 'company':
        return '/companies/dashboard'
      case 'individual':
        return '/individuals/dashboard'
      default:
        return '/'
    }
  }
  
  // Check if the user is an NGO
  const isNgo = user?.user_type === 'ngo'
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-udaan-navy text-white">
      <div className="udaan-container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <HeartHandshake className="h-6 w-6 text-udaan-orange" />
          <span>THE UDAAN COLLECTIVE</span>
        </Link>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-4 lg:gap-6">
          <nav className="flex items-center gap-4 lg:gap-6">
            <Link href="/ngos" className="flex items-center gap-2 text-sm font-medium udaan-nav-link">
              <Building className="h-4 w-4" />
              NGOs
            </Link>
            {/* Only show Verified link in the main nav if the user is an NGO */}
            {isNgo && (
              <Link href="/skills/verify" className="flex items-center gap-2 text-sm font-medium udaan-nav-link">
                <UserCheck className="h-4 w-4" />
                Verified
              </Link>
            )}
            <Link href="/marketplace" className="flex items-center gap-2 text-sm font-medium udaan-nav-link">
              <ShoppingBag className="h-4 w-4" />
              Resources
            </Link>
            <Link href="/training" className="flex items-center gap-2 text-sm font-medium udaan-nav-link">
              <GraduationCap className="h-4 w-4" />
              Training
            </Link>
          </nav>
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search NGOs, skills, resources..."
              className="w-64 rounded-full bg-background pl-8 md:w-80 lg:w-96"
            />
          </div>
          
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="relative text-white hover:text-udaan-orange">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-udaan-orange"></span>
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full border-2 border-udaan-orange">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                      <AvatarFallback className="bg-udaan-orange text-white">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link href={getDashboardLink()}>
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                  {/* Only show Skills Verification in dropdown if user is an NGO */}
                  {isNgo && (
                    <Link href="/skills/verify">
                      <DropdownMenuItem>Skills Verification</DropdownMenuItem>
                    </Link>
                  )}
                  <Link href="/settings">
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="flex items-center gap-2 text-white hover:text-udaan-orange hover:bg-opacity-10">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-udaan-orange hover:bg-opacity-90 border-none">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
        <div className="flex md:hidden flex-1 items-center justify-end">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-udaan-navy md:hidden">
          <div className="container flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <HeartHandshake className="h-6 w-6 text-udaan-orange" />
              <span>THE UDAAN COLLECTIVE</span>
            </Link>
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <div className="container grid gap-6 px-4 py-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search NGOs, skills, resources..." className="w-full rounded-full bg-background pl-8" />
            </div>
            <nav className="grid gap-4">
              <Link href="/ngos" className="flex items-center gap-2 text-lg font-medium text-white udaan-nav-link">
                <Building className="h-5 w-5" />
                NGOs
              </Link>
              {/* Only show Verified link in mobile menu if user is an NGO */}
              {isNgo && (
                <Link href="/skills/verify" className="flex items-center gap-2 text-lg font-medium text-white udaan-nav-link">
                  <UserCheck className="h-5 w-5" />
                  Verified
                </Link>
              )}
              <Link href="/marketplace" className="flex items-center gap-2 text-lg font-medium text-white udaan-nav-link">
                <ShoppingBag className="h-5 w-5" />
                Resources
              </Link>
              <Link href="/training" className="flex items-center gap-2 text-lg font-medium text-white udaan-nav-link">
                <GraduationCap className="h-5 w-5" />
                Training
              </Link>
            </nav>
            
            {user ? (
              <>
                <div className="flex items-center gap-4">
                  <Avatar className="h-9 w-9 border-2 border-udaan-orange">
                    <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                    <AvatarFallback className="bg-udaan-orange text-white">{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-300">{user.email}</p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Link href="/profile">
                    <Button variant="outline" className="w-full text-white border-white hover:bg-udaan-orange hover:border-transparent">Profile</Button>
                  </Link>
                  <Link href={getDashboardLink()}>
                    <Button variant="outline" className="w-full text-white border-white hover:bg-udaan-orange hover:border-transparent">Dashboard</Button>
                  </Link>
                  {/* Only show Skills Verification in mobile menu if user is an NGO */}
                  {isNgo && (
                    <Link href="/skills/verify">
                      <Button variant="outline" className="w-full text-white border-white hover:bg-udaan-orange hover:border-transparent">Skills Verification</Button>
                    </Link>
                  )}
                  <Link href="/settings">
                    <Button variant="outline" className="w-full text-white border-white hover:bg-udaan-orange hover:border-transparent">Settings</Button>
                  </Link>
                  <Button variant="outline" className="w-full text-white border-white hover:bg-udaan-orange hover:border-transparent" onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              </>
            ) : (
              <div className="grid gap-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full text-white border-white hover:bg-udaan-orange hover:border-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full bg-udaan-orange hover:bg-opacity-90 border-none">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

