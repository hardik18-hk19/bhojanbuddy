"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface MacroChartProps {
  protein: number;
  carbs: number;
  fat: number;
}

export function MacroChart({ protein, carbs, fat }: MacroChartProps) {
  // Convert grams to calories
  const proteinCalories = protein * 4;  // 4 calories per gram of protein
  const carbsCalories = carbs * 4;      // 4 calories per gram of carbs
  const fatCalories = fat * 9;          // 9 calories per gram of fat
  
  const data = [
    { name: 'Carbs', value: carbsCalories, color: 'hsl(var(--chart-1))' },
    { name: 'Protein', value: proteinCalories, color: 'hsl(var(--chart-2))' },
    { name: 'Fat', value: fatCalories, color: 'hsl(var(--chart-3))' },
  ];
  
  const totalCalories = proteinCalories + carbsCalories + fatCalories;
  
  // Calculate percentages
  const proteinPercentage = Math.round((proteinCalories / totalCalories) * 100);
  const carbsPercentage = Math.round((carbsCalories / totalCalories) * 100);
  const fatPercentage = Math.round((fatCalories / totalCalories) * 100);
  
  return (
    <div className="w-full h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} cal`, '']}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-bold">{totalCalories}</div>
        <div className="text-xs text-muted-foreground">calories</div>
      </div>
    </div>
  );
}