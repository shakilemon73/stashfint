import { useState, useEffect } from "react";
import { Coins, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StushBalanceProps {
  balance: number;
  todayEarnings: number;
}

export default function StushBalance({ balance, todayEarnings }: StushBalanceProps) {
  const [displayBalance, setDisplayBalance] = useState(0);

  useEffect(() => {
    const duration = 600;
    const steps = 30;
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
    <Card className="relative p-6 overflow-visible glass-card border-border/20 hover-elevate" data-testid="card-stush-balance">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-1/5 via-transparent to-chart-2/5 rounded-md pointer-events-none" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Coins className="w-8 h-8 text-gold" />
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gold-glow/40 to-transparent bg-[length:200%_100%]" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Stush Wage Balance</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-success-green" data-testid="text-today-earnings">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-medium">+${todayEarnings.toFixed(2)}</span>
          </div>
        </div>

        <div className="font-display text-5xl font-bold text-gold glow-gold mb-2 animate-count-up" data-testid="text-balance">
          ${displayBalance.toFixed(2)}
        </div>

        <div className="text-sm text-muted-foreground">
          Available for instant access
        </div>
      </div>
    </Card>
  );
}
