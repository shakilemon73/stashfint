import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PayPeriodInfoProps {
  startDate: string;
  endDate: string;
  daysCompleted: number;
  totalDays: number;
}

export default function PayPeriodInfo({ startDate, endDate, daysCompleted, totalDays }: PayPeriodInfoProps) {
  const progress = (daysCompleted / totalDays) * 100;

  return (
    <Card className="p-4 glass-card border-border/20" data-testid="card-pay-period">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Current Pay Period</span>
        </div>
        <span className="text-xs text-muted-foreground" data-testid="text-period-progress">
          Day {daysCompleted} of {totalDays}
        </span>
      </div>

      <div className="font-display text-xl font-semibold text-gold mb-3" data-testid="text-pay-period">
        {startDate} - {endDate}
      </div>

      <Progress value={progress} className="h-2" data-testid="progress-pay-period" />
    </Card>
  );
}
