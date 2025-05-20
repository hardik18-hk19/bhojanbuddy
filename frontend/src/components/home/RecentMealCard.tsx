import React from 'react';
import { Clock, Flame } from 'lucide-react';

interface Meal {
  id: number;
  name: string;
  time: string;
  calories: number;
  image: string;
}

interface RecentMealCardProps {
  meal: Meal;
}

const RecentMealCard: React.FC<RecentMealCardProps> = ({ meal }) => {
  return (
    <div className="bg-forest-green border border-primary-green/20 rounded-xl overflow-hidden flex">
      <div className="w-24 h-24 flex-shrink-0">
        <img 
          src={meal.image} 
          alt={meal.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex-1">
        <h3 className="font-semibold">{meal.name}</h3>
        <div className="flex items-center text-xs text-white/70 mt-1">
          <Clock size={12} className="mr-1" />
          <span>{meal.time}</span>
        </div>
        <div className="flex items-center text-xs mt-2">
          <Flame size={14} className="text-vibrant-yellow mr-1" />
          <span>{meal.calories} kcal</span>
        </div>
      </div>
    </div>
  );
};

export default RecentMealCard;