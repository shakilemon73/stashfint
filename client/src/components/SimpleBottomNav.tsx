import { useState } from "react";
import { Home, Zap, TrendingUp, Clock, User } from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: typeof Home;
  testId: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home, testId: "nav-home" },
  { id: "access", label: "Access", icon: Zap, testId: "nav-access-pay" },
  { id: "boost", label: "Boost", icon: TrendingUp, testId: "nav-boost" },
  { id: "history", label: "History", icon: Clock, testId: "nav-history" },
  { id: "profile", label: "Profile", icon: User, testId: "nav-profile" },
];

export default function SimpleBottomNav() {
  const [active, setActive] = useState("home");

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-xl"
      data-testid="bottom-navigation"
    >
      <div className="max-w-md mx-auto px-4 py-2 safe-area-pb">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  console.log(`Navigated to ${item.label}`);
                }}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-h-[56px] min-w-[56px] justify-center ${
                  isActive ? 'text-gold' : 'text-muted-foreground hover-elevate'
                }`}
                data-testid={item.testId}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
