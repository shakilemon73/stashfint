import { useState, useEffect } from "react";
import { Clock, DollarSign } from "lucide-react";

interface WorkStatusCardProps {
  workHours: number;
  hourlyRate: number;
  status: "active" | "paused" | "offline";
}

export default function WorkStatusCard({ workHours, hourlyRate, status }: WorkStatusCardProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const progress = (workHours / 8) * 100;

  const statusConfig = {
    active: { color: 'text-success-green', bg: 'bg-success-green/10', label: 'On the Clock' },
    paused: { color: 'text-gold', bg: 'bg-gold/10', label: 'Paused' },
    offline: { color: 'text-muted-foreground', bg: 'bg-muted/10', label: 'Off Duty' }
  };

  const config = statusConfig[status];

  return (
    <div className="space-y-4" data-testid="card-work-status">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${config.bg} flex items-center justify-center`}>
            <Clock className={`w-6 h-6 ${config.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Work Status</p>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')} ${status === 'active' ? 'animate-pulse' : ''}`} />
              <p className={`font-semibold ${config.color}`} data-testid="text-status">{config.label}</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold font-display text-foreground" data-testid="text-current-time">
            {hours}:{minutes}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Hours Today</span>
          <span className="font-semibold text-foreground" data-testid="text-work-hours">{workHours.toFixed(1)} / 8.0 hrs</span>
        </div>
        
        <div className="h-2 rounded-full bg-muted/20 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-chart-1 to-chart-2 transition-all duration-500 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            data-testid="progress-work-hours"
          />
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gold" />
          <span className="text-sm text-muted-foreground">
            Earning <span className="font-semibold text-gold">${hourlyRate}/hour</span>
          </span>
        </div>
      </div>
    </div>
  );
}
