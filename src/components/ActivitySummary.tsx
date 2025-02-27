
import { useState, useEffect } from "react";
import { Activity, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface ActivitySummaryProps {
  className?: string;
  compact?: boolean;
}

export function ActivitySummary({ className, compact = false }: ActivitySummaryProps) {
  const [steps, setSteps] = useState(() => {
    // Load from local storage or default to a random value
    const saved = localStorage.getItem("currentSteps");
    return saved ? parseInt(saved) : Math.floor(Math.random() * 8000);
  });
  
  const [stepsGoal] = useState(10000);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Calculate distance and calories based on steps
    // Average stride length is about 0.762 meters
    const distanceInKm = (steps * 0.762) / 1000;
    // Rough estimate: 1 step burns about 0.04 calories
    const caloriesBurned = steps * 0.04;
    
    setDistance(parseFloat(distanceInKm.toFixed(2)));
    setCalories(Math.round(caloriesBurned));
    
    localStorage.setItem("currentSteps", steps.toString());
  }, [steps]);
  
  const progressPercentage = Math.min((steps / stepsGoal) * 100, 100);
  
  // Simulate step increases periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // Only update sometimes to make it feel more natural
        setSteps(prev => Math.min(prev + Math.floor(Math.random() * 20), stepsGoal * 1.2));
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [stepsGoal]);
  
  if (compact) {
    return (
      <Card 
        className={cn("glass-card cursor-pointer transition-transform duration-200 hover:scale-[1.02]", className)}
        onClick={() => navigate("/activity")}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">{steps.toLocaleString()} steps</div>
                <div className="text-sm text-muted-foreground">{progressPercentage.toFixed(0)}% of goal</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={cn("glass-card", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-hydration-500" />
          Activity Tracking
        </CardTitle>
        <CardDescription>Your daily movement summary</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Daily Goal</span>
            <span className="text-sm font-medium">{steps.toLocaleString()} / {stepsGoal.toLocaleString()}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-primary/5 rounded-lg p-3">
            <div className="text-sm text-muted-foreground">Distance</div>
            <div className="text-lg font-semibold">{distance} km</div>
          </div>
          <div className="bg-primary/5 rounded-lg p-3">
            <div className="text-sm text-muted-foreground">Calories</div>
            <div className="text-lg font-semibold">{calories}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ActivitySummary;
