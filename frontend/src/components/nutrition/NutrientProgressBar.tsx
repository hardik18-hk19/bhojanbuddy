import React from 'react';

interface NutrientProgressBarProps {
  name: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

const NutrientProgressBar: React.FC<NutrientProgressBarProps> = ({ 
  name, current, target, unit, color 
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div className="bg-white/5 rounded-lg p-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm">{name}</span>
        <span className="text-sm text-white/70">
          {current} <span className="text-xs">{unit}</span> / {target} <span className="text-xs">{unit}</span>
        </span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div 
          className={`${color} h-2 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default NutrientProgressBar;