
import { useState, useEffect } from "react";
import { Droplet, Award, Gauge, Trophy, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { HydrationProgress } from "@/components/HydrationProgress";
import { ActivitySummary } from "@/components/ActivitySummary";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [streakCount, setStreakCount] = useState(() => Math.floor(Math.random() * 7) + 1);
  const [rewards, setRewards] = useState(() => Math.floor(Math.random() * 100) + 50);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get current hour to personalize greeting
    const currentHour = new Date().getHours();
    
    // Check time of day for greeting
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);
  
  const [greeting, setGreeting] = useState("Hello");
  
  // Handle auth success
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setUsername("Alex");
  };
  
  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 pb-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-1">{greeting}, {username}</h1>
          <p className="text-muted-foreground">Stay hydrated, stay active</p>
        </div>
        
        {!isLoggedIn && (
          <Card className="glass-card mb-8 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Track your hydration journey
                  </h3>
                  <p className="text-muted-foreground">
                    Sign in to save your progress and earn rewards
                  </p>
                </div>
                <Button onClick={() => setShowAuthModal(true)}>
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Card className="glass-card h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Daily Hydration
                </h3>
                <HydrationProgress />
                <Button 
                  variant="outline"
                  className="mt-6"
                  onClick={() => navigate("/hydration")}
                >
                  Track Details
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-7 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <ActivitySummary />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card 
            className="glass-card cursor-pointer transition-transform duration-200 hover:scale-[1.02] animate-fade-in"
            style={{ animationDelay: "300ms" }}
            onClick={() => navigate("/profile")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-hydration-500/10 flex items-center justify-center">
                  <Gauge className="h-6 w-6 text-hydration-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Streak</h3>
                  <div className="flex items-center gap-1">
                    <Droplet className="h-4 w-4 text-hydration-500" fill="rgba(14, 165, 233, 0.2)" />
                    <span className="font-semibold">{streakCount} days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className="glass-card cursor-pointer transition-transform duration-200 hover:scale-[1.02] animate-fade-in"
            style={{ animationDelay: "400ms" }}
            onClick={() => navigate("/rewards")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-hydration-500/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-hydration-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Rewards</h3>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-hydration-500" />
                    <span className="font-semibold">{rewards} points</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className="glass-card cursor-pointer transition-transform duration-200 hover:scale-[1.02] animate-fade-in"
            style={{ animationDelay: "500ms" }}
            onClick={() => navigate("/challenges")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-hydration-500/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-hydration-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Challenges</h3>
                    <p className="text-sm text-muted-foreground">Weekly challenges</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Index;
