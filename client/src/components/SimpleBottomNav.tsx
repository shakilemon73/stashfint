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
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-xl"
      data-testid="bottom-navigation"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-md mx-auto px-2 py-2 safe-area-pb">
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
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-h-[64px] min-w-[64px] justify-center ${
                  isActive 
                    ? 'text-gold bg-gold/10 border border-gold/20' 
                    : 'text-muted-foreground hover-elevate'
                }`}
                data-testid={item.testId}
                aria-label={`Navigate to ${item.label}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-6 h-6" aria-hidden="true" />
                <span className={`text-xs font-semibold ${isActive ? 'text-gold' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
