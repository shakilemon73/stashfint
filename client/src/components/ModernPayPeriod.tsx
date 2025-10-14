interface ModernPayPeriodProps {
  startDate: string;
  endDate: string;
  daysCompleted: number;
  totalDays: number;
}

export default function ModernPayPeriod({ startDate, endDate, daysCompleted, totalDays }: ModernPayPeriodProps) {
  const progress = (daysCompleted / totalDays) * 100;

  return (
    <div className="relative rounded-2xl overflow-hidden" data-testid="card-pay-period">
      <div className="absolute inset-0 backdrop-blur-xl bg-card/40 border border-white/10" />
      
      <div className="relative p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pay Period</div>
            <div className="font-display text-xl font-bold text-foreground" data-testid="text-pay-period">
              {startDate} - {endDate}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gold" data-testid="text-period-progress">{daysCompleted}</div>
            <div className="text-xs text-muted-foreground">of {totalDays} days</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-chart-1 to-chart-2"
              style={{ width: `${progress}%` }}
              data-testid="progress-pay-period"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            {Math.round(progress)}% complete
          </div>
        </div>
      </div>
    </div>
  );
}
