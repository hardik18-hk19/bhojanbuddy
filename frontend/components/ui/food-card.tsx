"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FoodCardProps {
  name: string;
  image: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  tags?: string[];
  className?: string;
}

export function FoodCard({
  name,
  image,
  calories,
  carbs,
  protein,
  fat,
  tags = [],
  className,
}: FoodCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-md",
        className
      )}
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg">{name}</h3>
          <span className="bg-bb-primary/10 text-bb-primary px-2 py-0.5 rounded-full text-sm font-medium">
            {calories} kcal
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">Carbs</p>
            <p className="font-medium">{carbs}g</p>
          </div>
          <div className="text-center p-2 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">Protein</p>
            <p className="font-medium">{protein}g</p>
          </div>
          <div className="text-center p-2 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">Fat</p>
            <p className="font-medium">{fat}g</p>
          </div>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}