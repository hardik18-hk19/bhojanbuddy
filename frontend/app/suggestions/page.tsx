import { PageContainer } from "@/components/page-container"
import { SuggestionCard } from "@/components/suggestion-card"
import { Apple, Salad, Clock, Heart, Coffee, Droplets, Bike } from "lucide-react"

export default function SuggestionsPage() {
  return (
    <PageContainer className="max-w-xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Personalized Suggestions</h1>
          <p className="text-muted-foreground">
            Smart recommendations based on your diet and health goals
          </p>
        </div>
        
        <div className="bg-card rounded-xl p-5 shadow-sm border border-accent/30">
          <div className="flex items-center space-x-3 mb-3">
            <div className="rounded-full bg-accent/20 p-2">
              <Heart className="h-5 w-5 text-accent" />
            </div>
            <h2 className="font-medium">Your Health Summary</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Based on your recent meals, you're doing well with protein intake but could benefit from reducing carbohydrates and increasing fiber.
          </p>
        </div>
        
        <div className="grid gap-4">
          <SuggestionCard
            title="Try more fibrous vegetables"
            description="Adding broccoli, spinach and lentils can help increase your fiber intake and improve digestion."
            icon={<Salad className="h-5 w-5" />}
            actionText="Learn more"
            onAction={() => {}}
          />
          
          <SuggestionCard
            title="Consider intermittent fasting"
            description="Based on your meal patterns, a 16:8 fasting schedule might help regulate blood sugar levels."
            icon={<Clock className="h-5 w-5" />}
            actionText="View schedule"
            onAction={() => {}}
          />
          
          <SuggestionCard
            title="Reduce caffeine intake"
            description="Your evening coffee might be affecting your sleep quality. Try herbal teas instead."
            icon={<Coffee className="h-5 w-5" />}
            actionText="Alternative drinks"
            onAction={() => {}}
          />
          
          <SuggestionCard
            title="Stay hydrated"
            description="Your water intake seems lower than recommended. Aim for 8-10 glasses daily."
            icon={<Droplets className="h-5 w-5" />}
            actionText="Set reminders"
            onAction={() => {}}
          />
          
          <SuggestionCard
            title="Add more activity"
            description="A 20-minute walk after meals can help regulate blood sugar and improve metabolism."
            icon={<Bike className="h-5 w-5" />}
            actionText="Activity ideas"
            onAction={() => {}}
          />
        </div>
        
        <div className="flex justify-center pt-4">
          <button className="btn-primary">
            <Apple className="mr-2 h-4 w-4" />
            Get Meal Suggestions
          </button>
        </div>
      </div>
    </PageContainer>
  )
}