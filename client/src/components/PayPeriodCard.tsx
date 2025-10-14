import { Calendar, ChevronRight } from "lucide-react";

interface PayPeriodCardProps {
  startDate: string;
  endDate: string;
  daysCompleted: number;
  totalDays: number;
}

export default function PayPeriodCard({ startDate, endDate, daysCompleted, totalDays }: PayPeriodCardProps) {
  const progress = (daysCompleted / totalDays) * 100;
  const daysRemaining = totalDays - daysCompleted;

  return (
    <button
      onClick={() => console.log('View pay period details')}
      className="w-full space-y-4 text-left hover-elevate active-elevate-2 p-4 rounded-2xl border border-border/30 transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      data-testid="card-pay-period"
      aria-label={`Pay period from ${startDate} to ${endDate}, ${daysCompleted} of ${totalDays} days completed`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-muted/10 border border-border/30 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-foreground" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Current Period</p>
            <p className="font-bold text-foreground" data-testid="text-pay-period">
              {startDate} - {endDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-3xl font-bold font-display text-gold tabular-nums leading-none" data-testid="text-period-progress">
              {daysCompleted}
            </p>
            <p className="text-xs text-muted-foreground font-medium">of {totalDays} days</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative h-3 rounded-full bg-muted/20 overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-chart-1 to-chart-2 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
            data-testid="progress-pay-period"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-foreground">{Math.round(progress)}% complete</span>
          <span className="text-muted-foreground font-medium">
            {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
          </span>
        </div>
      </div>
    </button>
  );
}
