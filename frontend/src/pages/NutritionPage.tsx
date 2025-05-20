import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import NutrientCard from '../components/nutrition/NutrientCard';
import NutrientProgressBar from '../components/nutrition/NutrientProgressBar';
import MealDetail from '../components/nutrition/MealDetail';

const NutritionPage = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [expandedMeal, setExpandedMeal] = useState<string | null>('lunch');
  
  // Mock meal data
  const meals = {
    breakfast: {
      name: 'Breakfast',
      time: '8:30 AM',
      calories: 350,
      items: [
        { name: 'Masala Dosa', amount: '1 serving', calories: 250, carbs: 35, protein: 6, fat: 8 },
        { name: 'Coconut Chutney', amount: '2 tbsp', calories: 60, carbs: 3, protein: 1, fat: 5 },
        { name: 'Filter Coffee', amount: '1 cup', calories: 40, carbs: 5, protein: 1, fat: 2 }
      ],
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    lunch: {
      name: 'Lunch',
      time: '1:15 PM',
      calories: 420,
      items: [
        { name: 'Palak Paneer', amount: '1 cup', calories: 240, carbs: 12, protein: 15, fat: 16 },
        { name: 'Roti', amount: '2 pieces', calories: 140, carbs: 24, protein: 4, fat: 2 },
        { name: 'Cucumber Raita', amount: '1/2 cup', calories: 40, carbs: 4, protein: 2, fat: 2 }
      ],
      image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  };

  const totalCalories = Object.values(meals).reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = Object.values(meals).reduce(
    (sum, meal) => sum + meal.items.reduce((s, item) => s + item.protein, 0), 
    0
  );
  const totalCarbs = Object.values(meals).reduce(
    (sum, meal) => sum + meal.items.reduce((s, item) => s + item.carbs, 0), 
    0
  );
  const totalFat = Object.values(meals).reduce(
    (sum, meal) => sum + meal.items.reduce((s, item) => s + item.fat, 0), 
    0
  );

  const toggleMeal = (mealId: string) => {
    setExpandedMeal(expandedMeal === mealId ? null : mealId);
  };

  return (
    <div className="py-6 space-y-6">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Nutrition Summary</h1>
          <button className="flex items-center text-primary-green text-sm">
            <Calendar size={16} className="mr-1" />
            Today
          </button>
        </div>
        
        <div className="bg-primary-green/10 rounded-xl p-4 border border-primary-green/30 mb-6">
          <div className="text-center mb-4">
            <p className="text-sm text-white/70">Daily Calories</p>
            <div className="flex items-baseline justify-center">
              <span className="text-3xl font-bold">{totalCalories}</span>
              <span className="text-white/70 ml-1">/ 2000 kcal</span>
            </div>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-3 mb-4">
            <div 
              className="bg-primary-green h-3 rounded-full" 
              style={{ width: `${Math.min((totalCalories / 2000) * 100, 100)}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <NutrientCard 
              name="Protein" 
              value={totalProtein} 
              unit="g" 
              target={80} 
              color="bg-blue-500" 
            />
            <NutrientCard 
              name="Carbs" 
              value={totalCarbs} 
              unit="g" 
              target={250} 
              color="bg-amber-500" 
            />
            <NutrientCard 
              name="Fats" 
              value={totalFat} 
              unit="g" 
              target={65} 
              color="bg-pink-500" 
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Nutrients Breakdown</h2>
        </div>
        
        <div className="space-y-3">
          <NutrientProgressBar
            name="Protein"
            current={totalProtein}
            target={80}
            unit="g"
            color="bg-blue-500"
          />
          <NutrientProgressBar
            name="Carbohydrates"
            current={totalCarbs}
            target={250}
            unit="g"
            color="bg-amber-500"
          />
          <NutrientProgressBar
            name="Fats"
            current={totalFat}
            target={65}
            unit="g"
            color="bg-pink-500"
          />
          <NutrientProgressBar
            name="Fiber"
            current={18}
            target={28}
            unit="g"
            color="bg-green-500"
          />
          <NutrientProgressBar
            name="Sugar"
            current={25}
            target={36}
            unit="g"
            color="bg-red-500"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Today's Meals</h2>
        
        <div className="space-y-3">
          {Object.entries(meals).map(([id, meal]) => (
            <div key={id}>
              <button 
                className="w-full bg-forest-green border border-primary-green/20 rounded-xl overflow-hidden flex items-center p-3 hover:bg-forest-green/80 transition-colors"
                onClick={() => toggleMeal(id)}
              >
                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden mr-3">
                  <img 
                    src={meal.image} 
                    alt={meal.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{meal.name}</h3>
                    <span className="text-vibrant-yellow font-medium">{meal.calories} kcal</span>
                  </div>
                  <p className="text-sm text-white/70">{meal.time}</p>
                  <p className="text-xs text-white/60 mt-1">
                    {meal.items.map(item => item.name).join(', ')}
                  </p>
                </div>
                <div className="ml-2">
                  {expandedMeal === id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              {expandedMeal === id && (
                <MealDetail meal={meal} />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NutritionPage;