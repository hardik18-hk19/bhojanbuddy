import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface NutritionBreakdownProps {
  icon: React.ReactNode;
  name: string;
  amount: number;
  unit: string;
  target: number;
  warning?: boolean;
}

export function NutritionBreakdown({
  icon,
  name,
  amount,
  unit,
  target,
  warning = false
}: NutritionBreakdownProps) {
  const percentage = Math.min(Math.round((amount / target) * 100), 100);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-1.5 rounded-full",
            warning ? "bg-sunny-amber/20" : "bg-primary/10"
          )}>
            {icon}
          </div>
          <span className="font-medium">{name}</span>
        </div>
        <div className="text-right">
          <span className="font-medium">{amount}{unit}</span>
          <span className="text-muted-foreground text-sm"> / {target}{unit}</span>
        </div>
      </div>
      
      <Progress 
        value={percentage} 
        className={cn(
          "h-2",
          warning ? "bg-sunny-amber/20" : "bg-primary/10"
        )}
      />
      
      {warning && (
        <p className="text-xs text-sunny-amber mt-1">
          This is higher than recommended for a single meal
        </p>
      )}
    </div>
  );
}