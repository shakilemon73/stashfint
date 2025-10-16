import { useState } from "react";
import { Home, Zap, TrendingUp, Clock, User } from "lucide-react";
import { motion } from "framer-motion";

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
              <motion.button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  console.log(`Navigated to ${item.label}`);
                }}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-h-[64px] min-w-[64px] justify-center ${
                  isActive 
                    ? 'text-gold' 
                    : 'text-muted-foreground hover-elevate'
                }`}
                data-testid={item.testId}
                aria-label={`Navigate to ${item.label}`}
                aria-current={isActive ? 'page' : undefined}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active state glow */}
                {isActive && (
                  <>
                    <motion.div 
                      className="absolute inset-0 bg-gold/10 rounded-xl border border-gold/20"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    <motion.div 
                      className="absolute -inset-1 bg-gold/20 rounded-xl blur-md"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      aria-hidden="true"
                    />
                  </>
                )}
                
                <motion.div
                  animate={isActive ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-6 h-6 relative z-10" aria-hidden="true" />
                </motion.div>
                
                <span className={`text-xs font-semibold relative z-10 ${isActive ? 'text-gold' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
