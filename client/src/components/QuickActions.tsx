import { Download, Building2, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuickActions() {
  const actions = [
    { icon: Download, label: "Request Money", variant: "default" as const, testId: "button-request-money" },
    { icon: Building2, label: "Loan Access", variant: "outline" as const, testId: "button-loan-access" },
    { icon: Clock, label: "Update Employment", variant: "outline" as const, testId: "button-update-employment" },
    { icon: Zap, label: "Earn $7,400", variant: "default" as const, testId: "button-earn-boost", highlight: true },
  ];

  return (
    <div className="grid grid-cols-4 gap-2" data-testid="section-quick-actions">
      {actions.map((action, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <Button
            size="icon"
            variant={action.variant}
            className={`w-14 h-14 ${action.highlight ? 'bg-gradient-gold border-none text-black' : ''}`}
            data-testid={action.testId}
            onClick={() => console.log(`${action.label} clicked`)}
          >
            <action.icon className="w-5 h-5" />
          </Button>
          <span className="text-xs text-center text-muted-foreground leading-tight">
            {action.label}
          </span>
        </div>
      ))}
    </div>
  );
}
