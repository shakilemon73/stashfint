import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import TransactionCard, { type Transaction } from "./TransactionCard";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card className="p-4 glass-card border-border/20" data-testid="card-transactions">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Transactions:</h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gold"
            data-testid="button-see-all"
            onClick={() => console.log('See All clicked')}
          >
            See All
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="w-8 h-8"
            data-testid="button-filter"
            onClick={() => console.log('Filter clicked')}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </Card>
  );
}
