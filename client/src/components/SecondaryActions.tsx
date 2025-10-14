import { Building2, History, Zap } from "lucide-react";

export default function SecondaryActions() {
  const actions = [
    { 
      icon: Building2, 
      label: "Loan Access",
      description: "Get instant cash",
      testId: "button-loan-access"
    },
    { 
      icon: History, 
      label: "Update Job",
      description: "Change details",
      testId: "button-update-job"
    },
    { 
      icon: Zap, 
      label: "Boost Pay",
      description: "Earn more",
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
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/50 hover-elevate active-elevate-2 transition-all min-h-[96px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            data-testid={action.testId}
            aria-label={`${action.label}: ${action.description}`}
          >
            <div className="w-10 h-10 rounded-xl bg-muted/10 border border-border/30 flex items-center justify-center">
              <Icon className="w-5 h-5 text-foreground" aria-hidden="true" />
            </div>
            <div className="text-center space-y-0.5">
              <p className="text-sm font-bold text-foreground leading-tight">
                {action.label}
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                {action.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
