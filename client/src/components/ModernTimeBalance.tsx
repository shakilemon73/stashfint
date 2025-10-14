import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

interface ModernTimeBalanceProps {
  balance: number;
  workHours: number;
  hourlyRate: number;
  todayEarnings: number;
}

export default function ModernTimeBalance({ balance, workHours, hourlyRate, todayEarnings }: ModernTimeBalanceProps) {
  const [time, setTime] = useState(new Date());
  const [displayBalance, setDisplayBalance] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const duration = 800;
    const steps = 40;
    const increment = balance / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= balance) {
        setDisplayBalance(balance);
        clearInterval(timer);
      } else {
        setDisplayBalance(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [balance]);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const progress = (workHours / 8) * 100;

  return (
    <div className="relative rounded-3xl overflow-hidden" data-testid="card-hero-balance">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-1/20 via-chart-2/10 to-chart-3/20" />
      <div className="absolute inset-0 backdrop-blur-xl bg-card/40 border border-white/10" />
      
      <div className="relative p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Stush Balance</div>
            <div className="font-display text-6xl font-bold bg-gradient-to-r from-chart-1 via-gold to-chart-2 bg-clip-text text-transparent animate-count-up" data-testid="text-balance">
              ${displayBalance.toFixed(2)}
            </div>
            <div className="flex items-center gap-2 text-success-green" data-testid="text-today-earnings">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+${todayEarnings.toFixed(2)} today</span>
            </div>
          </div>

          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-chart-1/20 to-chart-2/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-gold" data-testid="text-current-time">
                  {hours}:{minutes}
                </div>
                <div className="text-xs text-muted-foreground font-mono mt-1">{seconds}</div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="flex items-center gap-1.5 bg-success-green/20 backdrop-blur-sm border border-success-green/40 rounded-full px-3 py-1.5" data-testid="status-on-clock">
                <div className="w-2 h-2 rounded-full bg-success-green animate-pulse" />
                <span className="text-xs font-semibold text-success-green">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Work Progress</span>
            <span className="font-semibold text-foreground" data-testid="text-work-hours">{workHours.toFixed(1)}h / 8h</span>
          </div>
          <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-chart-1 to-chart-2 transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
              data-testid="progress-work-hours"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Earning <span className="text-gold font-semibold">${hourlyRate}/hr</span> · Available for instant access
          </div>
        </div>
      </div>
    </div>
  );
}
