import React from "react"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <main className={`container mx-auto px-4 py-6 pb-20 md:pb-6 ${className}`}>
      {children}
    </main>
  )
}