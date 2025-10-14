import TransactionList from "../TransactionList";

export default function TransactionListExample() {
  const transactions = [
    {
      id: "1",
      company: "John Doe Inc.",
      date: "July 09, 2025",
      amount: 360.50,
      status: "sent" as const,
      type: "credit" as const,
    },
    {
      id: "2",
      company: "Larana Inc.",
      date: "July 09, 2025",
      amount: 280.75,
      status: "sent" as const,
      type: "credit" as const,
    },
    {
      id: "3",
      company: "Upwork",
      date: "July 08, 2025",
      amount: 1300.00,
      status: "pending" as const,
      type: "credit" as const,
    },
  ];

  return <TransactionList transactions={transactions} />;
}
