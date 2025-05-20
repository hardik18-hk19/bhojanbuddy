import React from "react"
import { cn } from "@/lib/utils"

interface NutritionCardProps {
  title: string
  value: string | number
  unit: string
  icon: React.ReactNode
  className?: string
}

export function NutritionCard({ title, value, unit, icon, className }: NutritionCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-xl p-6 shadow-lg gradient-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2",
      "group relative overflow-hidden",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <div className="flex items-baseline space-x-1">
            <p className="text-3xl font-bold tracking-tight group-hover:scale-110 transition-transform duration-300">
              {value}
            </p>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors duration-300">
          <div className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}