"use client"

import { useState } from "react"
import { PageContainer } from "@/components/page-container"
import { ImageUpload } from "@/components/image-upload"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const router = useRouter()
  
  const handleImageSelected = (file: File | null) => {
    setSelectedImage(file)
  }
  
  const handleAnalyzeFood = () => {
    if (!selectedImage) return
    
    setAnalyzing(true)
    
    // Simulate analysis delay
    setTimeout(() => {
      setAnalyzing(false)
      router.push("/summary")
    }, 3000)
  }
  
  return (
    <PageContainer className="max-w-xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Upload Your Meal</h1>
        <p className="text-muted-foreground">
          Take a photo of your food or upload an existing image to get nutrition analysis
        </p>
        
        <ImageUpload 
          onImageSelected={handleImageSelected}
          className="my-6"
        />
        
        <div className="flex justify-end">
          <button 
            className="btn-primary"
            disabled={!selectedImage || analyzing}
            onClick={handleAnalyzeFood}
          >
            {analyzing ? (
              <>
                <span className="animate-pulse">Analyzing...</span>
              </>
            ) : (
              <>
                <span>Analyze Food</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>
        
        <div className="text-sm text-muted-foreground mt-6">
          <p className="text-center">
            For best results, make sure your food is clearly visible in the photo.
          </p>
        </div>
      </div>
    </PageContainer>
  )
}