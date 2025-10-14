import { useState, useEffect } from "react";
import { TrendingUp, Eye, EyeOff } from "lucide-react";

interface HeroBalanceCardProps {
  balance: number;
  todayEarnings: number;
}

export default function HeroBalanceCard({ balance, todayEarnings }: HeroBalanceCardProps) {
  const [displayBalance, setDisplayBalance] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;
    
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
  }, [balance, isVisible]);

  return (
    <div className="relative" data-testid="card-hero-balance">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-1 via-gold to-chart-2 rounded-3xl opacity-10" />
      <div className="relative px-6 py-8 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-2">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Available Balance</p>
            <div className="flex items-center gap-4">
              <h1 
                className="font-display text-6xl font-bold text-foreground leading-none tabular-nums" 
                data-testid="text-balance"
                aria-label={`Balance: ${balance.toFixed(2)} dollars`}
              >
                {isVisible ? `$${displayBalance.toFixed(2)}` : '••••••'}
              </h1>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="w-12 h-12 rounded-xl border border-border/50 hover-elevate active-elevate-2 flex items-center justify-center transition-all"
                data-testid="button-toggle-balance"
                aria-label={isVisible ? "Hide balance" : "Show balance"}
                aria-pressed={!isVisible}
                role="switch"
                aria-checked={isVisible}
              >
                {isVisible ? (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2" data-testid="text-today-earnings">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success-green/10 border border-success-green/20">
            <TrendingUp className="w-4 h-4 text-success-green" aria-hidden="true" />
            <span className="text-sm font-semibold text-success-green tabular-nums">+${todayEarnings.toFixed(2)}</span>
          </div>
          <span className="text-sm text-muted-foreground">earned today</span>
        </div>
      </div>
    </div>
  );
}
