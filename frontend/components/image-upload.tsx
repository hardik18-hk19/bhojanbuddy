"use client"

import React, { useState, useRef } from "react"
import { Camera, Upload, X, Loader2 } from "lucide-react"

interface ImageUploadProps {
  onImageSelected: (file: File | null) => void
  className?: string
}

export function ImageUpload({ onImageSelected, className = "" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageSelected(file)
      
      // Simulate processing delay
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    } else {
      setPreview(null)
      onImageSelected(null)
    }
  }
  
  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  
  const handleRemoveImage = () => {
    setPreview(null)
    onImageSelected(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  
  return (
    <div className={`w-full ${className}`}>
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        capture="environment"
      />
      
      {preview ? (
        <div className="relative rounded-2xl overflow-hidden bg-black/5 aspect-[4/3] w-full">
          <img 
            src={preview} 
            alt="Food preview" 
            className="w-full h-full object-cover"
          />
          
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p className="text-sm font-medium">Analyzing your food...</p>
            </div>
          )}
          
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div 
          onClick={handleCameraClick}
          className="rounded-2xl border-2 border-dashed border-border bg-muted/40 p-8 text-center hover:bg-muted/60 transition-colors cursor-pointer aspect-[4/3] flex flex-col items-center justify-center"
        >
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <Camera className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-2 text-lg font-semibold">Upload food photo</h3>
            <p className="mt-1 text-sm text-muted-foreground mb-4">
              Take a photo or upload an image of your meal
            </p>
            <button className="btn-primary">
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </button>
          </div>
        </div>
      )}
    </div>
  )
}