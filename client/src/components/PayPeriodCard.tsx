import { Calendar } from "lucide-react";

interface PayPeriodCardProps {
  startDate: string;
  endDate: string;
  daysCompleted: number;
  totalDays: number;
}

export default function PayPeriodCard({ startDate, endDate, daysCompleted, totalDays }: PayPeriodCardProps) {
  const progress = (daysCompleted / totalDays) * 100;

  return (
    <div className="space-y-4" data-testid="card-pay-period">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-muted/10 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current Period</p>
            <p className="font-semibold text-foreground" data-testid="text-pay-period">{startDate} - {endDate}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold font-display text-gold" data-testid="text-period-progress">{daysCompleted}</p>
          <p className="text-xs text-muted-foreground">of {totalDays}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-2 rounded-full bg-muted/20 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-chart-1 to-chart-2 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
            data-testid="progress-pay-period"
          />
        </div>
        <p className="text-xs text-muted-foreground text-right">{Math.round(progress)}% complete</p>
      </div>
    </div>
  );
}
