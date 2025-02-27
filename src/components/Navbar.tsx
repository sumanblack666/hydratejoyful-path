
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Droplet, 
  Award, 
  User, 
  Menu, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/hydration",
      label: "Hydration",
      icon: Droplet,
    },
    {
      href: "/rewards",
      label: "Rewards",
      icon: Award,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <>
      {/* Top navigation - visible on larger screens */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="container mx-auto glass-card rounded-b-2xl py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <NavLink to="/" className="flex items-center gap-2">
                <Droplet className="h-6 w-6 text-hydration-500" />
                <span className="font-bold text-xl">100PLUS</span>
              </NavLink>
              
              <nav className="flex items-center gap-2 ml-6">
                {routes.map((route) => (
                  <NavLink
                    key={route.href}
                    to={route.href}
                    className={({ isActive }) => cn(
                      "nav-link",
                      isActive && "active"
                    )}
                  >
                    {route.label}
                  </NavLink>
                ))}
              </nav>
            </div>
            
            <AuthButton />
          </div>
        </div>
      </div>
      
      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="glass-card rounded-b-2xl p-4">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-hydration-500" />
              <span className="font-bold text-lg">100PLUS</span>
            </NavLink>
            
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-card border-0">
                <div className="flex flex-col gap-6 mt-10">
                  {routes.map((route) => (
                    <NavLink
                      key={route.href}
                      to={route.href}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) => cn(
                        "flex items-center gap-2 py-2 text-foreground transition-colors hover:text-primary",
                        isActive && "text-primary font-medium"
                      )}
                    >
                      <route.icon className="h-5 w-5" />
                      {route.label}
                    </NavLink>
                  ))}
                  <div className="mt-6">
                    <AuthButton />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Bottom navigation - mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 block md:hidden">
        <div className="glass-card rounded-t-2xl">
          <div className="flex items-center justify-around">
            {routes.map((route) => {
              const isActive = location.pathname === route.href;
              return (
                <NavLink 
                  key={route.href} 
                  to={route.href}
                  className={cn(
                    "bottom-nav-item",
                    isActive && "active"
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  <span>{route.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Content padding for fixed navbar */}
      <div className="pt-16 pb-16 md:pb-6" />
    </>
  );
}

function AuthButton() {
  // In a real app, this would be connected to authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <>
      {isLoggedIn ? (
        <Button
          variant="outline"
          onClick={() => setIsLoggedIn(false)}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          onClick={() => setIsLoggedIn(true)}
        >
          Sign In
        </Button>
      )}
    </>
  );
}

export default Navbar;
