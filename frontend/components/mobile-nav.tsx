"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Upload, Pi as Pie, Lightbulb, User } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    return pathname === path
  }
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border">
      <nav className="flex justify-around py-2">
        <Link href="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
          <Home className="h-6 w-6" />
          <span>Home</span>
        </Link>
        <Link href="/upload" className={`bottom-nav-item ${isActive('/upload') ? 'active' : ''}`}>
          <Upload className="h-6 w-6" />
          <span>Upload</span>
        </Link>
        <Link href="/summary" className={`bottom-nav-item ${isActive('/summary') ? 'active' : ''}`}>
          <Pie className="h-6 w-6" />
          <span>Nutrition</span>
        </Link>
        <Link href="/suggestions" className={`bottom-nav-item ${isActive('/suggestions') ? 'active' : ''}`}>
          <Lightbulb className="h-6 w-6" />
          <span>Tips</span>
        </Link>
        <Link href="/profile" className={`bottom-nav-item ${isActive('/profile') ? 'active' : ''}`}>
          <User className="h-6 w-6" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  )
}