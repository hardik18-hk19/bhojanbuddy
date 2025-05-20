import React from 'react';

interface NutrientCardProps {
  name: string;
  value: number;
  unit: string;
  target: number;
  color: string;
}

const NutrientCard: React.FC<NutrientCardProps> = ({ name, value, unit, target, color }) => {
  const percentage = Math.min((value / target) * 100, 100);
  
  return (
    <div className="bg-white/5 rounded-lg p-3 text-center">
      <p className="text-white/70 text-xs mb-1">{name}</p>
      <div className="flex items-baseline justify-center">
        <span className="text-lg font-semibold">{value}</span>
        <span className="text-white/70 text-xs ml-1">{unit}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
        <div 
          className={`${color} h-1.5 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default NutrientCard;