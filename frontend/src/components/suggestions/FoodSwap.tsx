import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface Food {
  name: string;
  calories: number;
  benefits?: string[];
  image: string;
}

interface Swap {
  id: number;
  from: Food;
  to: Food;
}

interface FoodSwapProps {
  swap: Swap;
}

const FoodSwap: React.FC<FoodSwapProps> = ({ swap }) => {
  return (
    <div className="bg-forest-green border border-primary-green/20 rounded-xl p-4">
      <h3 className="font-semibold mb-3">Suggested Swap</h3>
      
      <div className="flex items-center">
        <div className="flex-1">
          <div className="bg-white/5 rounded-lg overflow-hidden">
            <div className="h-24 w-full">
              <img 
                src={swap.from.image} 
                alt={swap.from.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 text-center">
              <p className="font-medium text-sm">{swap.from.name}</p>
              <p className="text-xs text-white/70">{swap.from.calories} kcal</p>
            </div>
          </div>
        </div>
        
        <div className="mx-2 flex-shrink-0">
          <div className="bg-primary-green/20 p-1.5 rounded-full">
            <ArrowRight size={20} className="text-primary-green" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-primary-green/20 rounded-lg overflow-hidden border border-primary-green/30">
            <div className="h-24 w-full">
              <img 
                src={swap.to.image} 
                alt={swap.to.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 text-center">
              <p className="font-medium text-sm">{swap.to.name}</p>
              <p className="text-xs text-white/70">{swap.to.calories} kcal</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 bg-white/5 rounded-lg p-3">
        <p className="text-sm font-medium mb-2">Benefits:</p>
        <ul className="space-y-1">
          {swap.to.benefits?.map((benefit, index) => (
            <li key={index} className="flex items-center text-sm text-white/80">
              <Check size={14} className="text-primary-green mr-1.5 flex-shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FoodSwap;