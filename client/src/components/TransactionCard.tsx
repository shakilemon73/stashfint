import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface Transaction {
  id: string;
  company: string;
  date: string;
  amount: number;
  status: "sent" | "pending" | "failed";
  type: "credit" | "debit";
}

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const statusColors = {
    sent: "bg-success-green/20 text-success-green border-success-green/30",
    pending: "bg-gold/20 text-gold border-gold/30",
    failed: "bg-destructive/20 text-destructive border-destructive/30",
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-md hover-elevate active-elevate-2 cursor-pointer"
      data-testid={`transaction-${transaction.id}`}
      onClick={() => console.log('Transaction clicked:', transaction.id)}
    >
      <Avatar className="w-12 h-12" data-testid={`avatar-${transaction.id}`}>
        <AvatarFallback className="bg-card border border-border text-foreground">
          <Building2 className="w-5 h-5" />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="font-medium text-foreground truncate" data-testid={`text-company-${transaction.id}`}>
          {transaction.company}
        </div>
        <div className="text-xs text-muted-foreground" data-testid={`text-date-${transaction.id}`}>
          {transaction.date}
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className={`font-display text-lg font-semibold ${transaction.type === 'credit' ? 'text-gold' : 'text-foreground'}`} data-testid={`text-amount-${transaction.id}`}>
          ${transaction.amount.toFixed(2)}
        </div>
        <Badge 
          variant="outline" 
          className={`text-xs ${statusColors[transaction.status]}`}
          data-testid={`badge-status-${transaction.id}`}
        >
          {transaction.status === 'sent' ? 'Sent' : transaction.status === 'pending' ? 'Pending' : 'Failed'}
        </Badge>
      </div>
    </div>
  );
}
