import { ArrowUpRight, ArrowDownRight, Building2, ChevronRight } from "lucide-react";

export interface Transaction {
  id: string;
  company: string;
  date: string;
  amount: number;
  status: "sent" | "pending" | "failed";
  type: "credit" | "debit";
}

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const statusConfig = {
    sent: { color: 'text-success-green', bg: 'bg-success-green/10', border: 'border-success-green/20', label: 'Sent' },
    pending: { color: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/20', label: 'Pending' },
    failed: { color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/20', label: 'Failed' }
  };

  const config = statusConfig[transaction.status];
  const isCredit = transaction.type === 'credit';

  return (
    <button
      onClick={() => console.log('Transaction clicked:', transaction.id)}
      className="w-full flex items-center gap-4 p-4 rounded-2xl hover-elevate active-elevate-2 transition-all text-left border border-transparent hover:border-border/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-ring"
      data-testid={`transaction-${transaction.id}`}
      aria-label={`Transaction: ${isCredit ? 'Received' : 'Sent'} ${transaction.amount} dollars ${isCredit ? 'from' : 'to'} ${transaction.company} on ${transaction.date}, status: ${transaction.status}`}
    >
      <div className="w-12 h-12 rounded-xl bg-muted/10 border border-border/30 flex items-center justify-center flex-shrink-0">
        <Building2 className="w-6 h-6 text-foreground" aria-hidden="true" />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <p className="font-bold text-foreground truncate" data-testid={`text-company-${transaction.id}`}>
          {transaction.company}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-xs text-muted-foreground font-medium" data-testid={`text-date-${transaction.id}`}>
            {transaction.date}
          </p>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${config.bg} ${config.border} ${config.color} font-semibold`}>
            {config.label}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="text-right">
          <p className={`font-display text-lg font-bold tabular-nums ${isCredit ? 'text-success-green' : 'text-destructive'}`} data-testid={`text-amount-${transaction.id}`}>
            {isCredit ? '+' : '-'}${transaction.amount.toFixed(2)}
          </p>
        </div>
        {isCredit ? (
          <ArrowUpRight className="w-5 h-5 text-success-green" aria-hidden="true" />
        ) : (
          <ArrowDownRight className="w-5 h-5 text-destructive" aria-hidden="true" />
        )}
        <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
      </div>
    </button>
  );
}
