import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TimeOnClockProps {
  workHours: number;
  hourlyRate: number;
}

export default function TimeOnClock({ workHours, hourlyRate }: TimeOnClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const secondsDegree = (time.getSeconds() / 60) * 360;
  const minutesDegree = (time.getMinutes() / 60) * 360;
  const hoursDegree = ((time.getHours() % 12) / 12) * 360 + (time.getMinutes() / 60) * 30;

  return (
    <Card className="relative p-6 overflow-visible glass-card border-border/20" data-testid="card-time-clock">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Work Hours</span>
          </div>
          <div className="font-display text-4xl font-bold text-success-green mb-1" data-testid="text-work-hours">
            {workHours.toFixed(2)} HRS.
          </div>
          <div className="text-sm text-muted-foreground">
            @ ${hourlyRate.toFixed(2)}/hr
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-32 h-32 relative">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                opacity="0.2"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-pulse-glow glow-gold"
                strokeDasharray={`${(workHours / 8) * 339} 339`}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--chart-1))" />
                  <stop offset="100%" stopColor="hsl(45 95% 52%)" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-display text-xl font-bold text-foreground" data-testid="text-current-time">
                {hours}:{minutes}
              </div>
              <div className="text-xs text-muted-foreground font-mono">{seconds}</div>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className="absolute w-0.5 h-6 bg-success-green rounded-full origin-bottom"
                  style={{ 
                    transform: `rotate(${hoursDegree}deg) translateY(-50%)`,
                    top: '50%',
                  }}
                />
                <div 
                  className="absolute w-0.5 h-8 bg-gold rounded-full origin-bottom"
                  style={{ 
                    transform: `rotate(${minutesDegree}deg) translateY(-50%)`,
                    top: '50%',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-success-green/20 border border-success-green/30 rounded-full px-2 py-1" data-testid="status-on-clock">
            <div className="w-1.5 h-1.5 rounded-full bg-success-green animate-blink" />
            <span className="text-xs font-medium text-success-green">On the Clock</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
