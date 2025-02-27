
import { useState } from "react";
import { Trophy, Gift, ChevronRight, ShoppingBag, PercentCircle, Tag, AlarmCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthModal from "@/components/AuthModal";

const rewardsList = [
  {
    id: "r1",
    title: "10% Off Fitness Tracker",
    description: "Get a discount on your next fitness tracker purchase",
    points: 300,
    category: "discount",
    icon: PercentCircle,
  },
  {
    id: "r2",
    title: "Premium Water Bottle",
    description: "Redeem a high-quality insulated water bottle",
    points: 500,
    category: "product",
    icon: ShoppingBag,
  },
  {
    id: "r3",
    title: "Free Energy Drink",
    description: "Redeem a free energy drink at participating stores",
    points: 200,
    category: "voucher",
    icon: Tag,
  },
  {
    id: "r4",
    title: "Personal Trainer Session",
    description: "One free session with a certified fitness trainer",
    points: 750,
    category: "service",
    icon: AlarmCheck,
  },
];

const Rewards = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<typeof rewardsList[0] | null>(null);
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const [points, setPoints] = useState(350);
  const [nextTier] = useState(500);
  const navigate = useNavigate();
  
  // Handle auth success
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
  };
  
  // Handle reward selection
  const handleSelectReward = (reward: typeof rewardsList[0]) => {
    setSelectedReward(reward);
    setShowRedeemDialog(true);
  };
  
  // Handle redeem
  const handleRedeem = () => {
    if (!selectedReward) return;
    
    if (points < selectedReward.points) {
      toast.error("Not enough points to redeem this reward");
      setShowRedeemDialog(false);
      return;
    }
    
    setPoints(prev => prev - selectedReward.points);
    toast.success("Reward redeemed successfully!");
    setShowRedeemDialog(false);
  };
  
  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 pb-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-1">Rewards</h1>
          <p className="text-muted-foreground">Earn points and redeem exciting rewards</p>
        </div>
        
        {isLoggedIn ? (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card animate-fade-in">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-hydration-500" />
                    Your Points
                  </CardTitle>
                  <CardDescription>
                    Continue hydrating to earn more points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-center my-6 text-hydration-500">
                    {points} pts
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm">Silver Tier</span>
                    <span className="text-sm">Gold Tier</span>
                  </div>
                  <Progress value={(points / nextTier) * 100} className="h-2" />
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    {nextTier - points} points until Gold Tier
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate("/")}
                    >
                      Earn More Points
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card animate-fade-in" style={{ animationDelay: "100ms" }}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-hydration-500" />
                    Earn Points
                  </CardTitle>
                  <CardDescription>
                    Complete activities to earn rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-primary/5 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">Daily Hydration Goal</div>
                        <div className="text-sm text-muted-foreground">Meet your daily target</div>
                      </div>
                      <Badge variant="outline">+50 pts</Badge>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">7-Day Streak</div>
                        <div className="text-sm text-muted-foreground">Stay consistent for a week</div>
                      </div>
                      <Badge variant="outline">+100 pts</Badge>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">Complete Profile</div>
                        <div className="text-sm text-muted-foreground">Add your details</div>
                      </div>
                      <Badge variant="outline">+25 pts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-hydration-500" />
                  Available Rewards
                </CardTitle>
                <CardDescription>
                  Redeem your points for exclusive rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rewardsList.map((reward) => (
                    <div 
                      key={reward.id}
                      className="bg-background/50 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-primary/5 transition-colors"
                      onClick={() => handleSelectReward(reward)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <reward.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{reward.title}</div>
                          <div className="text-sm text-muted-foreground">{reward.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{reward.points} pts</Badge>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="glass-card animate-fade-in">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Sign in to access rewards</h2>
                  <p className="text-muted-foreground mb-4">
                    Sign in to track your points, earn rewards, and redeem exciting offers.
                  </p>
                  <Button className="w-full sm:w-auto" onClick={() => setShowAuthModal(true)}>
                    Sign In
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        onSuccess={handleAuthSuccess}
      />
      
      {/* Redeem Confirmation */}
      <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
        <DialogContent className="glass-card sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Redeem Reward</DialogTitle>
            <DialogDescription>
              Are you sure you want to redeem this reward?
            </DialogDescription>
          </DialogHeader>
          
          {selectedReward && (
            <div className="my-4 p-4 bg-background/50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <selectedReward.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="font-semibold">{selectedReward.title}</div>
              </div>
              <p className="text-sm text-muted-foreground">{selectedReward.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium">Cost:</span>
                <Badge variant="outline">{selectedReward.points} pts</Badge>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium">Your Points:</span>
                <span className={points < selectedReward.points ? "text-destructive" : ""}>{points} pts</span>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRedeemDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleRedeem}
              disabled={selectedReward ? points < selectedReward.points : true}
            >
              Redeem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Rewards;
