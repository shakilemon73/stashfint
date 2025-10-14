import { useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: JSX.Element;
  testId: string;
};

export default function ModernBottomNav() {
  const [active, setActive] = useState("home");

  const navItems: NavItem[] = [
    { 
      id: "home", 
      label: "Home",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={active === "home" ? "currentColor" : "none"} />
          <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      testId: "nav-home"
    },
    { 
      id: "access", 
      label: "Access",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={active === "access" ? "currentColor" : "none"} />
        </svg>
      ),
      testId: "nav-access-pay"
    },
    { 
      id: "boost", 
      label: "Boost",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={active === "boost" ? "currentColor" : "none"} />
        </svg>
      ),
      testId: "nav-boost"
    },
    { 
      id: "history", 
      label: "History",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill={active === "history" ? "currentColor" : "none"} />
          <path d="M12 6v6l4 2" stroke={active === "history" ? "white" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      testId: "nav-history"
    },
    { 
      id: "profile", 
      label: "Profile",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill={active === "profile" ? "currentColor" : "none"} />
        </svg>
      ),
      testId: "nav-profile"
    },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50"
      data-testid="bottom-navigation"
    >
      <div className="max-w-md mx-auto">
        <div className="relative mx-4 mb-4 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-2xl bg-card/60 border border-white/20" />
          <div className="relative flex items-center justify-around px-2 py-3">
            {navItems.map((item) => {
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    console.log(`Navigated to ${item.label}`);
                  }}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                    isActive ? 'bg-gradient-to-br from-chart-1 to-chart-2' : 'hover-elevate active-elevate-2'
                  }`}
                  data-testid={item.testId}
                >
                  <div className={isActive ? 'text-black' : 'text-muted-foreground'}>
                    {item.icon}
                  </div>
                  {isActive && (
                    <span className="text-xs font-bold text-black">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
