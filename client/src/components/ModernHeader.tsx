interface ModernHeaderProps {
  userName: string;
  hasNotifications?: boolean;
}

export default function ModernHeader({ userName, hasNotifications = false }: ModernHeaderProps) {
  return (
    <div className="relative" data-testid="header-dashboard">
      <div className="absolute inset-0 backdrop-blur-xl bg-card/40 border-b border-white/10" />
      
      <div className="relative flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center font-display text-lg font-bold text-black" data-testid="avatar-user">
            {userName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">Welcome back</div>
            <div className="font-display text-base font-bold text-foreground" data-testid="text-username">{userName}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            className="relative w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover-elevate active-elevate-2 flex items-center justify-center"
            onClick={() => console.log('Notifications clicked')}
            data-testid="button-notifications"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {hasNotifications && (
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-card" />
            )}
          </button>
          <button 
            className="w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover-elevate active-elevate-2 flex items-center justify-center"
            onClick={() => console.log('Menu clicked')}
            data-testid="button-menu"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
