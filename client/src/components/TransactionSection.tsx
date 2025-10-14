import { ChevronRight } from "lucide-react";
import TransactionItem, { type Transaction } from "./TransactionItem";

interface TransactionSectionProps {
  transactions: Transaction[];
}

export default function TransactionSection({ transactions }: TransactionSectionProps) {
  return (
    <div className="space-y-4" data-testid="section-transactions">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
        <button 
          onClick={() => console.log('See All clicked')}
          className="flex items-center gap-1 text-sm font-semibold text-gold hover-elevate px-2 py-1 rounded-lg"
          data-testid="button-see-all"
        >
          See All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1">
        {transactions.slice(0, 5).map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
