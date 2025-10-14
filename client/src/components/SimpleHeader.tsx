import { Bell, Menu } from "lucide-react";

interface SimpleHeaderProps {
  userName: string;
  hasNotifications?: boolean;
}

export default function SimpleHeader({ userName, hasNotifications = false }: SimpleHeaderProps) {
  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <div className="border-b border-border/50 bg-background/95 backdrop-blur-xl" data-testid="header-dashboard">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center font-display text-base font-bold text-black" 
            data-testid="avatar-user"
          >
            {initials}
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Welcome back</p>
            <p className="font-semibold text-foreground" data-testid="text-username">{userName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => console.log('Notifications clicked')}
            className="relative w-11 h-11 rounded-xl border border-border/50 hover-elevate active-elevate-2 flex items-center justify-center"
            data-testid="button-notifications"
          >
            <Bell className="w-5 h-5 text-foreground" />
            {hasNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
            )}
          </button>
          <button 
            onClick={() => console.log('Menu clicked')}
            className="w-11 h-11 rounded-xl border border-border/50 hover-elevate active-elevate-2 flex items-center justify-center"
            data-testid="button-menu"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
