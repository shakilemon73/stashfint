import { Bell, Menu } from "lucide-react";

interface SimpleHeaderProps {
  userName: string;
  hasNotifications?: boolean;
  notificationCount?: number;
}

export default function SimpleHeader({ userName, hasNotifications = false, notificationCount = 0 }: SimpleHeaderProps) {
  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <header 
      className="border-b border-border/50 bg-background/95 backdrop-blur-xl" 
      data-testid="header-dashboard"
      role="banner"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => console.log('Profile clicked')}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center font-display text-base font-bold text-black hover-elevate active-elevate-2 transition-all"
            data-testid="avatar-user"
            aria-label={`View profile for ${userName}`}
          >
            {initials}
          </button>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Welcome back</p>
            <p className="font-bold text-foreground" data-testid="text-username">{userName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => console.log('Notifications clicked')}
            className="relative w-12 h-12 rounded-xl border border-border/50 hover-elevate active-elevate-2 flex items-center justify-center transition-all"
            data-testid="button-notifications"
            aria-label={hasNotifications ? `${notificationCount} new notifications` : 'Notifications'}
          >
            <Bell className="w-5 h-5 text-foreground" aria-hidden="true" />
            {hasNotifications && (
              <>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" aria-hidden="true" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-destructive text-white text-xs font-bold flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </>
            )}
          </button>
          <button 
            onClick={() => console.log('Menu clicked')}
            className="w-12 h-12 rounded-xl border border-border/50 hover-elevate active-elevate-2 flex items-center justify-center transition-all"
            data-testid="button-menu"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-foreground" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
