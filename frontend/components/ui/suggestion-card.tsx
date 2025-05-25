"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface SuggestionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "diet" | "health" | "activity";
  className?: string;
  onDismiss?: () => void;
}

export function SuggestionCard({
  title,
  description,
  icon,
  category,
  className,
  onDismiss,
}: SuggestionCardProps) {
  const getCategoryStyles = () => {
    switch (category) {
      case "diet":
        return "bg-bb-primary/10 border-bb-primary/20 text-bb-primary";
      case "health":
        return "bg-bb-cta/10 border-bb-cta/20 text-bb-cta";
      case "activity":
        return "bg-bb-accent/10 border-bb-accent/20 text-bb-accent";
      default:
        return "bg-muted border-border";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileHover={{ y: -5 }}
      className={cn(
        "p-6 rounded-xl border shadow-sm",
        getCategoryStyles(),
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-full bg-white/80 dark:bg-black/20">
            {icon}
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        {onDismiss && (
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-full" 
            onClick={onDismiss}
          >
            <X size={16} />
          </Button>
        )}
      </div>
      
      <p className="text-sm opacity-90 mb-4">{description}</p>
      
      <Button className="w-full gap-2 bg-white dark:bg-black/20 text-foreground hover:bg-white/90 dark:hover:bg-black/30">
        <Check size={16} /> Apply Suggestion
      </Button>
    </motion.div>
  );
}