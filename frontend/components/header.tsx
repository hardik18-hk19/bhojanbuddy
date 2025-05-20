"use client"

import Link from "next/link"
import { MenuIcon, X } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-primary">BhojanBuddy</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/upload" className="text-sm font-medium hover:text-primary transition-colors">
            Upload Food
          </Link>
          <Link href="/summary" className="text-sm font-medium hover:text-primary transition-colors">
            Nutrition
          </Link>
          <Link href="/suggestions" className="text-sm font-medium hover:text-primary transition-colors">
            Suggestions
          </Link>
          <ThemeToggle />
        </div>
        
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-accent/20"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b border-border animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/upload"
              className="px-2 py-1 rounded hover:bg-accent/20 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload Food
            </Link>
            <Link 
              href="/summary"
              className="px-2 py-1 rounded hover:bg-accent/20 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Nutrition
            </Link>
            <Link 
              href="/suggestions" 
              className="px-2 py-1 rounded hover:bg-accent/20 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Suggestions
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}