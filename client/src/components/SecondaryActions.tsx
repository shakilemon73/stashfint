import { Building2, History, Zap } from "lucide-react";

export default function SecondaryActions() {
  const actions = [
    { 
      icon: Building2, 
      label: "Loan Access",
      testId: "button-loan-access"
    },
    { 
      icon: History, 
      label: "Update Job",
      testId: "button-update-job"
    },
    { 
      icon: Zap, 
      label: "Boost Earnings",
      testId: "button-boost"
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3" data-testid="section-secondary-actions">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.testId}
            onClick={() => console.log(`${action.label} clicked`)}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/50 hover-elevate active-elevate-2 transition-all min-h-[88px]"
            data-testid={action.testId}
          >
            <div className="w-10 h-10 rounded-xl bg-muted/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-xs font-medium text-center text-foreground leading-tight">
              {action.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
