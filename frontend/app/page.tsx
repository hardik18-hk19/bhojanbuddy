import Link from "next/link"
import { PageContainer } from "@/components/page-container"
import { Camera, Utensils, Apple, Heart } from "lucide-react"

export default function Home() {
  return (
    <PageContainer>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Your Personal Health Food Assistant
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Track your diet, analyze nutrition, and get personalized health suggestions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/upload" className="btn-primary">
              <Camera className="mr-2 h-4 w-4" />
              Upload Meal Photo
            </Link>
            <Link href="/summary" className="btn-secondary">
              <Utensils className="mr-2 h-4 w-4" />
              View Nutrition
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-8 py-8 md:py-12 lg:py-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
            How BhojanBuddy Works
          </h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            Simple steps to track your diet and improve your health
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-4 text-center">
            <div className="rounded-full p-2 bg-primary/10">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Upload Food Photo</h3>
            <p className="text-sm text-muted-foreground">
              Take a picture of your meal or upload from your gallery
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-4 text-center">
            <div className="rounded-full p-2 bg-primary/10">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Get Nutrition Analysis</h3>
            <p className="text-sm text-muted-foreground">
              View detailed breakdown of calories, carbs, protein, and more
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-4 text-center">
            <div className="rounded-full p-2 bg-primary/10">
              <Apple className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Personalized Suggestions</h3>
            <p className="text-sm text-muted-foreground">
              Get diet suggestions based on your health goals
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-medium leading-[1.1] sm:text-3xl">
            Track Your Health Journey
          </h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            Perfect for people with diabetes, hypertension, obesity or anyone wanting to maintain a healthy diet
          </p>
          <Link href="/profile" className="flex items-center text-primary font-medium">
            <Heart className="mr-1 h-4 w-4" />
            Set Your Health Goals
          </Link>
        </div>
      </section>
    </PageContainer>
  )
}