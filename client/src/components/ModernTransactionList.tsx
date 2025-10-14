import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";

export interface Transaction {
  id: string;
  company: string;
  date: string;
  amount: number;
  status: "sent" | "pending" | "failed";
  type: "credit" | "debit";
}

interface ModernTransactionListProps {
  transactions: Transaction[];
}

export default function ModernTransactionList({ transactions }: ModernTransactionListProps) {
  const statusColors = {
    sent: "bg-success-green/20 text-success-green border-success-green/30",
    pending: "bg-gold/20 text-gold border-gold/30",
    failed: "bg-destructive/20 text-destructive border-destructive/30",
  };

  const getCompanyIcon = (name: string) => {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-blue-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="relative rounded-2xl overflow-hidden" data-testid="card-transactions">
      <div className="absolute inset-0 backdrop-blur-xl bg-card/40 border border-white/10" />
      
      <div className="relative p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-foreground">Recent Activity</h3>
          <button 
            className="text-sm font-semibold text-gold hover-elevate px-3 py-1 rounded-lg"
            onClick={() => console.log('See All clicked')}
            data-testid="button-see-all"
          >
            See All
          </button>
        </div>

        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover-elevate active-elevate-2 cursor-pointer"
              onClick={() => console.log('Transaction clicked:', transaction.id)}
              data-testid={`transaction-${transaction.id}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCompanyIcon(transaction.company)} flex items-center justify-center flex-shrink-0`}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3 7h18M3 12h18M3 17h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground truncate" data-testid={`text-company-${transaction.id}`}>
                  {transaction.company}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground" data-testid={`text-date-${transaction.id}`}>
                  {transaction.date}
                  <span className={`px-2 py-0.5 rounded-full border ${statusColors[transaction.status]}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-right">
                  <div className={`font-display text-lg font-bold ${transaction.type === 'credit' ? 'text-success-green' : 'text-destructive'}`} data-testid={`text-amount-${transaction.id}`}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </div>
                </div>
                {transaction.type === 'credit' ? (
                  <ArrowUpRight className="w-5 h-5 text-success-green" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-destructive" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
