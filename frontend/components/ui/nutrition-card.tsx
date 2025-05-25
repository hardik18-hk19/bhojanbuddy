"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface NutritionCardProps {
  title: string;
  value: number;
  target: number;
  unit: string;
  color: string;
  icon: React.ReactNode;
  className?: string;
}

export function NutritionCard({
  title,
  value,
  target,
  unit,
  color,
  icon,
  className,
}: NutritionCardProps) {
  const percentage = Math.min(Math.round((value / target) * 100), 100);
  
  const getStatusColor = () => {
    if (percentage > 95) return "text-bb-error";
    if (percentage > 80) return "text-amber-500";
    return "text-bb-success";
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative p-6 rounded-xl border bg-card shadow-md",
        className
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-md ${color}`}>{icon}</div>
          <h3 className="font-medium text-lg">{title}</h3>
        </div>
        <span className={cn("text-sm font-semibold", getStatusColor())}>
          {percentage}%
        </span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm text-muted-foreground mb-1.5">
          <span>0 {unit}</span>
          <span>{target} {unit}</span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>

      <div className="flex justify-between items-end">
        <p className="text-2xl font-bold">
          {value}
          <span className="text-sm text-muted-foreground ml-1">{unit}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          {Math.abs(target - value)} {unit} {value > target ? "over" : "left"}
        </p>
      </div>
    </motion.div>
  );
}