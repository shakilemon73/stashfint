import TransactionCard from "../TransactionCard";

export default function TransactionCardExample() {
  const transaction = {
    id: "1",
    company: "John Doe Inc.",
    date: "July 09, 2025",
    amount: 360.50,
    status: "sent" as const,
    type: "credit" as const,
  };

  return <TransactionCard transaction={transaction} />;
}
