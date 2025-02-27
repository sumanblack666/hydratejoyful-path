
import { useState } from "react";
import { 
  User,
  Settings,
  Bell,
  Moon,
  LogOut,
  ChevronRight,
  Shield,
  Smartphone,
  HelpCircle,
  FileText,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthModal from "@/components/AuthModal";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  
  // Handle auth success
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    toast.success("Signed in successfully!");
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogoutDialog(false);
    toast.info("You have been signed out");
  };
  
  return (
    <>
      <Navbar />
      <div className="container max-w-3xl mx-auto px-4 pb-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-1">Profile</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        
        {isLoggedIn ? (
          <div className="flex flex-col gap-6">
            <Card className="glass-card animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">Alex Johnson</h2>
                    <p className="text-muted-foreground">alex.johnson@example.com</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="bg-hydration-500/10 text-hydration-700">
                        Premium Member
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-hydration-500" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Award className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-sm font-medium text-center">7 Day Streak</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Award className="h-7 w-7 text-primary" opacity={0.5} />
                    </div>
                    <div className="text-sm font-medium text-center text-muted-foreground">30 Day Streak</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Award className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-sm font-medium text-center">1000ml Club</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Award className="h-7 w-7 text-primary" opacity={0.5} />
                    </div>
                    <div className="text-sm font-medium text-center text-muted-foreground">2000ml Club</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-hydration-500" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive hydration reminders
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Moon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Dark Mode</div>
                        <div className="text-sm text-muted-foreground">
                          Toggle dark theme
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card animate-fade-in" style={{ animationDelay: "300ms" }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-hydration-500" />
                  Help & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-primary/5 transition-colors"
                    onClick={() => toast.info("Coming soon: Connecting health devices")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Connect Devices</div>
                        <div className="text-sm text-muted-foreground">
                          Integrate with health trackers
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                  
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-primary/5 transition-colors"
                    onClick={() => toast.info("Terms & Privacy would open here")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Privacy & Terms</div>
                        <div className="text-sm text-muted-foreground">
                          Review our policies
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                  
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-primary/5 transition-colors"
                    onClick={() => toast.info("FAQ would open here")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">FAQ</div>
                        <div className="text-sm text-muted-foreground">
                          Frequently asked questions
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              variant="outline"
              className="bg-destructive/5 hover:bg-destructive/10 text-destructive border-destructive/20 mt-2 animate-fade-in"
              style={{ animationDelay: "400ms" }}
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <Card className="glass-card animate-fade-in">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Sign in to your account</h2>
                  <p className="text-muted-foreground mb-4">
                    Sign in to track your hydration, earn rewards, and more.
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
      
      {/* Logout Confirmation */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="glass-card sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
