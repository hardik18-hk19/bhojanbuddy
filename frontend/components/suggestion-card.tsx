import React from "react"
import { cn } from "@/lib/utils"

interface SuggestionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  actionText?: string
  onAction?: () => void
}

export function SuggestionCard({ 
  title, 
  description, 
  icon, 
  className,
  actionText,
  onAction
}: SuggestionCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-xl p-6 shadow-lg gradient-border",
      "group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2",
      "relative overflow-hidden",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start space-x-4">
        <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors duration-300">
          <div className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 text-primary">
            {icon}
          </div>
        </div>
        
        <div className="space-y-2 flex-1">
          <h3 className="font-medium text-lg group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          
          {actionText && onAction && (
            <button 
              onClick={onAction}
              className="mt-4 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-300 flex items-center space-x-1 group/btn"
            >
              <span>{actionText}</span>
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}