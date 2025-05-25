"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HealthMetricProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  unit?: string;
  className?: string;
}

export function HealthMetric({
  label,
  value,
  icon,
  change,
  unit,
  className,
}: HealthMetricProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={cn(
        "p-4 rounded-xl border bg-card shadow-sm",
        className
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-muted">{icon}</div>
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
        
        {change && (
          <span className={cn(
            "text-xs font-medium rounded-full px-2 py-0.5",
            change.isPositive 
              ? "bg-bb-success/20 text-bb-success" 
              : "bg-bb-error/20 text-bb-error"
          )}>
            {change.isPositive ? "+" : ""}{change.value}%
          </span>
        )}
      </div>
      
      <div className="flex items-end gap-1">
        <span className="text-2xl font-bold">{value}</span>
        {unit && <span className="text-sm text-muted-foreground mb-0.5">{unit}</span>}
      </div>
    </motion.div>
  );
}