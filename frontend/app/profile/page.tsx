"use client"

import { useState } from "react"
import { PageContainer } from "@/components/page-container"
import { User, Heart, Activity, Target, Plus, Save } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  
  // Mock user data
  const userData = {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    age: 32,
    height: 165, // cm
    weight: 68, // kg
    healthConditions: ["Type 2 Diabetes", "Hypertension"],
    dailyGoals: {
      calories: 1800,
      carbs: 180, // g
      protein: 90, // g
      fat: 60, // g
      sugar: 25, // g
    },
    connectedApps: ["Google Fit", "MyFitnessPal"]
  }
  
  return (
    <PageContainer className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <button 
            className="btn-secondary flex items-center text-sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl p-5 shadow-sm">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h2 className="font-medium text-lg">{userData.name}</h2>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
                
                <div className="w-full border-t border-border my-4"></div>
                
                <div className="grid grid-cols-2 gap-2 w-full text-center mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Height</p>
                    <p className="font-medium">{userData.height} cm</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Weight</p>
                    <p className="font-medium">{userData.weight} kg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card rounded-xl p-5 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-medium">Health Conditions</h2>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {userData.healthConditions.map((condition, index) => (
                  <div 
                    key={index}
                    className="bg-secondary/20 rounded-full px-3 py-1 text-sm"
                  >
                    {condition}
                  </div>
                ))}
                
                {isEditing && (
                  <button className="rounded-full px-3 py-1 text-sm border border-dashed border-muted-foreground/50 text-muted-foreground flex items-center">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Condition
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-medium">Connected Health Apps</h2>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {userData.connectedApps.map((app, index) => (
                  <div 
                    key={index}
                    className="bg-accent/20 rounded-full px-3 py-1 text-sm"
                  >
                    {app}
                  </div>
                ))}
                
                {isEditing && (
                  <button className="rounded-full px-3 py-1 text-sm border border-dashed border-muted-foreground/50 text-muted-foreground flex items-center">
                    <Plus className="h-3 w-3 mr-1" />
                    Connect App
                  </button>
                )}
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-5 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-medium">Daily Goals</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Calories</label>
                    <div className="flex items-center mt-1">
                      <input 
                        type="number" 
                        value={userData.dailyGoals.calories}
                        disabled={!isEditing}
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                      />
                      <span className="ml-2 text-sm text-muted-foreground">kcal</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Carbohydrates</label>
                    <div className="flex items-center mt-1">
                      <input 
                        type="number" 
                        value={userData.dailyGoals.carbs}
                        disabled={!isEditing}
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                      />
                      <span className="ml-2 text-sm text-muted-foreground">g</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Protein</label>
                    <div className="flex items-center mt-1">
                      <input 
                        type="number" 
                        value={userData.dailyGoals.protein}
                        disabled={!isEditing}
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                      />
                      <span className="ml-2 text-sm text-muted-foreground">g</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Fat</label>
                    <div className="flex items-center mt-1">
                      <input 
                        type="number" 
                        value={userData.dailyGoals.fat}
                        disabled={!isEditing}
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                      />
                      <span className="ml-2 text-sm text-muted-foreground">g</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground">Sugar Limit</label>
                  <div className="flex items-center mt-1">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={userData.dailyGoals.sugar}
                      disabled={!isEditing}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 min-w-[2rem] text-sm">{userData.dailyGoals.sugar}g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}