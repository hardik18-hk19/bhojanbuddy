"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AlertTriangle,
  PieChart,
  Utensils,
  Clock,
  Flame,
  BrainIcon as GrainIcon,
  Droplets,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";
import { NutritionBreakdown } from "@/components/nutrition/nutrition-breakdown";
import { MacroChart } from "@/components/nutrition/macro-chart";

export default function SummaryPage() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("mealSummary");
    if (stored) setSummary(JSON.parse(stored));
  }, []);

  if (!summary) return <div>Loading...</div>;

  const imageUrl = summary.photo?.url || "/placeholder.jpg";
  const mainLabel = summary.photo?.label || "Unknown Dish";
  const mainNutrition = summary.nutrition || {};

  // You can set daily goals statically or fetch from backend/user profile
  const goals = {
    calories: 2000,
    carbs: 225,
    protein: 120,
    fat: 65,
    fiber: 30,
    sugar: 50,
    sodium: 2300,
  };

  // Calculate percentages of daily goals
  const calculatePercentage = (value: number, goal: number) => {
    return Math.min(Math.round((value / goal) * 100), 100);
  };

  const percentages = {
    calories: calculatePercentage(mainNutrition.calories, goals.calories),
    carbs: calculatePercentage(mainNutrition.carbs, goals.carbs),
    protein: calculatePercentage(mainNutrition.protein, goals.protein),
    fat: calculatePercentage(mainNutrition.fat, goals.fat),
  };

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="hidden"
      animate={true ? "visible" : "hidden"}
      variants={fadeIn}
    >
      <motion.div variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Nutrition Summary
          </h1>
          <p className="text-muted-foreground">
            Detailed breakdown of your meal's nutritional content and how it
            fits into your daily goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
            {/* Meal Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">{mainLabel}</CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                  <Image
                    src={imageUrl}
                    alt={mainLabel}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium mb-3">Nutrition Details</h3>
                <ul>
                  <li>Calories: {mainNutrition.calories}</li>
                  <li>Carbs: {mainNutrition.carbs}g</li>
                  <li>Protein: {mainNutrition.protein}g</li>
                  <li>Fat: {mainNutrition.fat}g</li>
                  <li>Sugar: {mainNutrition.sugar}g</li>
                  <li>Sodium: {mainNutrition.sodium}mg</li>
                </ul>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/suggestions">
                    Get Personalized Suggestions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Calories Card */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <Flame className="h-5 w-5 mr-2 text-primary" />
                  Calories
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-center mb-3">
                  <span className="text-4xl font-bold">
                    {mainNutrition.calories}
                  </span>
                  <span className="text-muted-foreground ml-1">cal</span>
                </div>

                <Progress
                  value={percentages.calories}
                  className="h-2 bg-muted"
                />

                <p className="text-sm text-center mt-2">
                  {percentages.calories}% of daily goal ({goals.calories} cal)
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
