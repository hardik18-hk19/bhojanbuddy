"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Upload, Pi as Pie, Lightbulb, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function SidebarNav() {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    return pathname === path
  }
  
  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/upload", label: "Upload", icon: <Upload className="h-5 w-5" /> },
    { href: "/summary", label: "Nutrition", icon: <Pie className="h-5 w-5" /> },
    { href: "/suggestions", label: "Suggestions", icon: <Lightbulb className="h-5 w-5" /> },
    { href: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
  ]
  
  return (
    <nav className="hidden md:block space-y-2 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Navigation
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent/20",
                isActive(item.href) ? "bg-accent/30 text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}