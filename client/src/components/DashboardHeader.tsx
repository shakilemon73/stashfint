import { Menu, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  userName: string;
  hasNotifications?: boolean;
}

export default function DashboardHeader({ userName, hasNotifications = false }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border/20" data-testid="header-dashboard">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10" data-testid="avatar-user">
          <AvatarFallback className="bg-gradient-gold text-black font-semibold">
            {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-xs text-muted-foreground">Welcome</div>
          <div className="font-semibold text-foreground" data-testid="text-username">{userName}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
          data-testid="button-notifications"
          onClick={() => console.log('Notifications clicked')}
        >
          <Bell className="w-5 h-5" />
          {hasNotifications && (
            <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-destructive border-2 border-background" />
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          data-testid="button-menu"
          onClick={() => console.log('Menu clicked')}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
