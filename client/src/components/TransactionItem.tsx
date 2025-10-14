import { ArrowUpRight, ArrowDownRight, Building2 } from "lucide-react";

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
    sent: { color: 'text-success-green', bg: 'bg-success-green/10', label: 'Sent' },
    pending: { color: 'text-gold', bg: 'bg-gold/10', label: 'Pending' },
    failed: { color: 'text-destructive', bg: 'bg-destructive/10', label: 'Failed' }
  };

  const config = statusConfig[transaction.status];

  return (
    <button
      onClick={() => console.log('Transaction clicked:', transaction.id)}
      className="w-full flex items-center gap-4 p-4 rounded-2xl hover-elevate active-elevate-2 transition-all text-left"
      data-testid={`transaction-${transaction.id}`}
    >
      <div className="w-12 h-12 rounded-xl bg-muted/10 flex items-center justify-center flex-shrink-0">
        <Building2 className="w-6 h-6 text-foreground" />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <p className="font-semibold text-foreground truncate" data-testid={`text-company-${transaction.id}`}>
          {transaction.company}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground" data-testid={`text-date-${transaction.id}`}>
            {transaction.date}
          </p>
          <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} font-medium`}>
            {config.label}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <p className={`font-display text-lg font-bold ${transaction.type === 'credit' ? 'text-success-green' : 'text-destructive'}`} data-testid={`text-amount-${transaction.id}`}>
          {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
        </p>
        {transaction.type === 'credit' ? (
          <ArrowUpRight className="w-5 h-5 text-success-green" />
        ) : (
          <ArrowDownRight className="w-5 h-5 text-destructive" />
        )}
      </div>
    </button>
  );
}
