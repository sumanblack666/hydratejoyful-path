
import { useState, useEffect } from "react";
import { Droplet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface HydrationProgressProps {
  className?: string;
  compact?: boolean;
}

export function HydrationProgress({ className, compact = false }: HydrationProgressProps) {
  const [hydrationGoal] = useState(2000); // 2000ml daily goal
  const [currentHydration, setCurrentHydration] = useState(() => {
    // Load from local storage or default to a value between 0 and the goal
    const saved = localStorage.getItem("currentHydration");
    return saved ? parseInt(saved) : Math.floor(Math.random() * 1500);
  });
  
  const progressPercentage = Math.min((currentHydration / hydrationGoal) * 100, 100);
  
  useEffect(() => {
    localStorage.setItem("currentHydration", currentHydration.toString());
  }, [currentHydration]);
  
  const addWater = (amount: number) => {
    const newValue = Math.min(currentHydration + amount, hydrationGoal * 1.5);
    setCurrentHydration(newValue);
    
    if (newValue >= hydrationGoal && currentHydration < hydrationGoal) {
      toast.success("Daily hydration goal achieved! 🎉", {
        description: "Great job staying hydrated today!"
      });
    }
  };
  
  const radius = compact ? 40 : 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="progress-circle" style={{ width: radius * 2.2, height: radius * 2.2 }}>
        <svg className="w-full h-full" viewBox={`0 0 ${radius * 2.2} ${radius * 2.2}`}>
          <circle
            className="progress-circle-bg"
            cx={radius * 1.1}
            cy={radius * 1.1}
            r={radius}
            fill="none"
          />
          <circle
            className="progress-circle-fill"
            cx={radius * 1.1}
            cy={radius * 1.1}
            r={radius}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${radius * 1.1} ${radius * 1.1})`}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Droplet
            className={cn(
              "text-hydration-500 animate-water-wave",
              compact ? "w-6 h-6" : "w-10 h-10"
            )}
            fill="rgba(14, 165, 233, 0.2)"
          />
          
          {!compact && (
            <>
              <div className="mt-2 text-2xl font-semibold">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-sm text-muted-foreground">
                {currentHydration} / {hydrationGoal} ml
              </div>
            </>
          )}
        </div>
      </div>
      
      {!compact && (
        <div className="mt-6 flex gap-3">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full flex items-center gap-1"
            onClick={() => addWater(250)}
          >
            <Plus className="h-4 w-4" />
            <span>250ml</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full flex items-center gap-1"
            onClick={() => addWater(500)}
          >
            <Plus className="h-4 w-4" />
            <span>500ml</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default HydrationProgress;
