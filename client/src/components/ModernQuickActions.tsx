export default function ModernQuickActions() {
  const actions = [
    { 
      label: "Request Money", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="url(#gradient1)" />
          <path d="M16 9v14M9 16h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="32" y2="32">
              <stop stopColor="#FFB800" />
              <stop offset="1" stopColor="#FF8C00" />
            </linearGradient>
          </defs>
        </svg>
      ),
      testId: "button-request-money",
      gradient: "from-yellow-500 to-orange-500"
    },
    { 
      label: "Loan Access", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="url(#gradient2)" />
          <rect x="7" y="10" width="18" height="12" rx="2" stroke="white" strokeWidth="2" fill="none" />
          <path d="M16 15v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <linearGradient id="gradient2" x1="0" y1="0" x2="32" y2="32">
              <stop stopColor="#00D4FF" />
              <stop offset="1" stopColor="#0080FF" />
            </linearGradient>
          </defs>
        </svg>
      ),
      testId: "button-loan-access",
      gradient: "from-cyan-500 to-blue-500"
    },
    { 
      label: "Update Job", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="url(#gradient3)" />
          <path d="M16 8v8l5 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="16" r="7" stroke="white" strokeWidth="2" fill="none" />
          <defs>
            <linearGradient id="gradient3" x1="0" y1="0" x2="32" y2="32">
              <stop stopColor="#A855F7" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
      ),
      testId: "button-update-job",
      gradient: "from-purple-500 to-violet-600"
    },
    { 
      label: "Boost $7,400", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="url(#gradient4)" />
          <path d="M18 8l-8 9h6l-2 7 8-9h-6l2-7z" fill="white" />
          <defs>
            <linearGradient id="gradient4" x1="0" y1="0" x2="32" y2="32">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      ),
      testId: "button-boost",
      gradient: "from-emerald-500 to-green-600"
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3" data-testid="section-quick-actions">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => console.log(`${action.label} clicked`)}
          className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover-elevate active-elevate-2 transition-all"
          data-testid={action.testId}
        >
          <div className="transition-transform group-hover:scale-110 group-active:scale-95">
            {action.icon}
          </div>
          <span className="text-xs font-medium text-foreground text-center leading-tight">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}
