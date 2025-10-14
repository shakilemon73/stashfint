import { useState } from "react";
import { Home, Zap, TrendingUp, Clock, User } from "lucide-react";

type NavItem = {
  id: string;
  icon: typeof Home;
  label: string;
  testId: string;
};

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "Home", testId: "nav-home" },
  { id: "access", icon: Zap, label: "Access Pay", testId: "nav-access-pay" },
  { id: "boost", icon: TrendingUp, label: "Boost", testId: "nav-boost" },
  { id: "history", icon: Clock, label: "History", testId: "nav-history" },
  { id: "profile", icon: User, label: "Profile", testId: "nav-profile" },
];

export default function BottomNav() {
  const [active, setActive] = useState("home");

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/20 safe-area-pb"
      data-testid="bottom-navigation"
    >
      <div className="max-w-md mx-auto px-4 py-2">
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
                className="flex flex-col items-center gap-1 py-2 px-3 rounded-md hover-elevate active-elevate-2 transition-all relative"
                data-testid={item.testId}
              >
                <Icon 
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-gold' : 'text-muted-foreground'
                  }`} 
                />
                {isActive && (
                  <>
                    <span className="text-xs font-medium text-gold">{item.label}</span>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gold rounded-full glow-gold" />
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
