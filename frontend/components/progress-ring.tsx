"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface ProgressRingProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  label?: string
  color?: string
}

export function ProgressRing({ 
  value, 
  size = 120, 
  strokeWidth = 10,
  className,
  label,
  color = "stroke-primary"
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference
  
  return (
    <div className={cn(
      "relative inline-flex items-center justify-center",
      "group hover:scale-105 transition-transform duration-300",
      className
    )}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-1000 ease-in-out group-hover:rotate-180"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-muted transition-all duration-300 group-hover:stroke-muted/50"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={cn(
            color,
            "transition-all duration-1000 ease-in-out"
          )}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center transition-transform duration-300 group-hover:scale-110">
        <span className="text-2xl font-bold">{value}%</span>
        {label && (
          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}