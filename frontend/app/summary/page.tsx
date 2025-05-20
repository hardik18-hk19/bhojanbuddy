"use client"

import { useState, useEffect } from "react"
import { PageContainer } from "@/components/page-container"
import { NutritionCard } from "@/components/nutrition-card"
import { ProgressRing } from "@/components/progress-ring"
import { Flame, Wheat, Beef, File as Oil, Activity, Weight, Circle } from "lucide-react"
import Link from "next/link"

export default function SummaryPage() {
  const [isLoading, setIsLoading] = useState(true)
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Mock nutrition data
  const nutritionData = {
    calories: 450,
    carbs: 55,
    protein: 22,
    fat: 15,
    fiber: 8,
    sugar: 12,
    dailyGoalPercent: 65,
  }
  
  const NutritionSkeleton = () => (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="flex justify-center">
        <div className="w-28 h-28 rounded-full bg-muted"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 rounded-xl bg-muted"></div>
        <div className="h-24 rounded-xl bg-muted"></div>
        <div className="h-24 rounded-xl bg-muted"></div>
        <div className="h-24 rounded-xl bg-muted"></div>
      </div>
      <div className="h-40 rounded-xl bg-muted"></div>
    </div>
  )
  
  return (
    <PageContainer className="max-w-lg mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Nutrition Summary</h1>
          <p className="text-muted-foreground">
            Analysis of your recent meal
          </p>
        </div>
        
        {isLoading ? (
          <NutritionSkeleton />
        ) : (
          <>
            <div className="flex justify-center my-8">
              <ProgressRing 
                value={nutritionData.dailyGoalPercent} 
                size={140}
                label="of daily goal"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <NutritionCard
                title="Calories"
                value={nutritionData.calories}
                unit="kcal"
                icon={<Flame className="h-5 w-5" />}
              />
              <NutritionCard
                title="Carbohydrates"
                value={nutritionData.carbs}
                unit="g"
                icon={<Wheat className="h-5 w-5" />}
              />
              <NutritionCard
                title="Protein"
                value={nutritionData.protein}
                unit="g"
                icon={<Beef className="h-5 w-5" />}
              />
              <NutritionCard
                title="Fat"
                value={nutritionData.fat}
                unit="g"
                icon={<Oil className="h-5 w-5" />}
              />
            </div>
            
            <div className="bg-card rounded-xl p-5 shadow-sm mt-6">
              <h3 className="font-medium mb-3">Nutritional Breakdown</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fiber</span>
                    <span className="font-medium">{nutritionData.fiber}g</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div 
                      className="h-2 bg-accent rounded-full" 
                      style={{ width: `${(nutritionData.fiber / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sugar</span>
                    <span className="font-medium">{nutritionData.sugar}g</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div 
                      className="h-2 bg-warning rounded-full" 
                      style={{ width: `${(nutritionData.sugar / 37) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Link href="/suggestions" className="text-primary text-sm font-medium flex items-center">
                    <Circle className="h-3 w-3 mr-1 fill-primary" />
                    View personalized suggestions
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Link href="/upload" className="text-primary font-medium text-sm flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                Log another meal
              </Link>
              <Link href="/profile" className="text-primary font-medium text-sm flex items-center">
                <Weight className="h-4 w-4 mr-1" />
                Adjust health goals
              </Link>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  )
}