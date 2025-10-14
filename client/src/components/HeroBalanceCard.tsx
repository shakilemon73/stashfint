import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

interface HeroBalanceCardProps {
  balance: number;
  todayEarnings: number;
}

export default function HeroBalanceCard({ balance, todayEarnings }: HeroBalanceCardProps) {
  const [displayBalance, setDisplayBalance] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
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

  return (
    <div className="relative" data-testid="card-hero-balance">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-1 via-gold to-chart-2 rounded-3xl opacity-10" />
      <div className="relative px-6 py-8 space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Available Balance</p>
            <h1 className="font-display text-6xl font-bold text-foreground leading-none" data-testid="text-balance">
              ${displayBalance.toFixed(2)}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2" data-testid="text-today-earnings">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success-green/10">
            <TrendingUp className="w-4 h-4 text-success-green" />
            <span className="text-sm font-semibold text-success-green">+${todayEarnings.toFixed(2)}</span>
          </div>
          <span className="text-sm text-muted-foreground">earned today</span>
        </div>
      </div>
    </div>
  );
}
