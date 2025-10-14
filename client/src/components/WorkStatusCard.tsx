import { useState, useEffect } from "react";
import { Clock, DollarSign, Play, Pause } from "lucide-react";

interface WorkStatusCardProps {
  workHours: number;
  hourlyRate: number;
  status: "active" | "paused" | "offline";
  onToggleStatus?: () => void;
}

export default function WorkStatusCard({ workHours, hourlyRate, status, onToggleStatus }: WorkStatusCardProps) {
  const [time, setTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const progress = (workHours / 8) * 100;

  const statusConfig = {
    active: { 
      color: 'text-success-green', 
      bg: 'bg-success-green/10', 
      border: 'border-success-green/20',
      label: 'On the Clock',
      action: 'Pause',
      icon: Pause
    },
    paused: { 
      color: 'text-gold', 
      bg: 'bg-gold/10',
      border: 'border-gold/20',
      label: 'Paused',
      action: 'Resume',
      icon: Play
    },
    offline: { 
      color: 'text-muted-foreground', 
      bg: 'bg-muted/10',
      border: 'border-muted/20',
      label: 'Off Duty',
      action: 'Clock In',
      icon: Play
    }
  };

  const config = statusConfig[status];
  const ActionIcon = config.icon;

  return (
    <div className="space-y-4" data-testid="card-work-status">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${config.bg} border ${config.border} flex items-center justify-center transition-all`}>
            <Clock className={`w-6 h-6 ${config.color}`} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Work Status</p>
            <div className="flex items-center gap-2">
              <div 
                className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')} ${status === 'active' ? 'animate-pulse' : ''}`}
                aria-label={`Status: ${config.label}`}
              />
              <p className={`font-bold ${config.color}`} data-testid="text-status">{config.label}</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold font-display text-foreground tabular-nums leading-none" data-testid="text-current-time">
            {hours}:{minutes}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">{seconds}s</p>
        </div>
      </div>

      <button
        onClick={onToggleStatus}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border transition-all ${
          status === 'active' 
            ? 'bg-destructive/10 border-destructive/20 text-destructive hover-elevate' 
            : 'bg-success-green/10 border-success-green/20 text-success-green hover-elevate'
        } active-elevate-2 min-h-[48px]`}
        data-testid="button-toggle-work"
        aria-label={`${config.action} work timer`}
      >
        <ActionIcon className="w-5 h-5" aria-hidden="true" />
        <span className="font-semibold">{isHovered ? config.action : config.label}</span>
      </button>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-medium">Hours Today</span>
          <span className="font-bold text-foreground tabular-nums" data-testid="text-work-hours">
            {workHours.toFixed(1)} / 8.0 hrs
          </span>
        </div>
        
        <div className="relative h-3 rounded-full bg-muted/20 overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-chart-1 to-chart-2 transition-all duration-500 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            data-testid="progress-work-hours"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Work progress: ${Math.round(progress)}%`}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gold" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">
              Earning <span className="font-bold text-gold tabular-nums">${hourlyRate}/hour</span>
            </span>
          </div>
          <span className="text-sm font-bold text-success-green tabular-nums">
            +${(workHours * hourlyRate).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
