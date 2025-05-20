import React from 'react';

interface FoodItem {
  name: string;
  amount: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

interface Meal {
  name: string;
  time: string;
  calories: number;
  items: FoodItem[];
  image: string;
}

interface MealDetailProps {
  meal: Meal;
}

const MealDetail: React.FC<MealDetailProps> = ({ meal }) => {
  return (
    <div className="bg-forest-green border border-primary-green/20 border-t-0 rounded-b-xl p-4 -mt-1 animate-fadeIn space-y-3">
      {meal.items.map((item, index) => (
        <div key={index} className="flex justify-between py-2 border-b border-white/10 last:border-0">
          <div>
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-xs text-white/70">{item.amount}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-vibrant-yellow">{item.calories} kcal</p>
            <p className="text-xs text-white/70">
              P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealDetail;