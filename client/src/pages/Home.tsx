import DashboardHeader from "@/components/DashboardHeader";
import StushBalance from "@/components/StushBalance";
import TimeOnClock from "@/components/TimeOnClock";
import PayPeriodInfo from "@/components/PayPeriodInfo";
import QuickActions from "@/components/QuickActions";
import TransactionList from "@/components/TransactionList";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  const mockTransactions = [
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
    {
      id: "4",
      company: "Blooming Dates",
      date: "June 18, 2025",
      amount: 15.00,
      status: "sent" as const,
      type: "credit" as const,
    },
    {
      id: "5",
      company: "Air BnB",
      date: "June 18, 2025",
      amount: 7.00,
      status: "sent" as const,
      type: "credit" as const,
    },
    {
      id: "6",
      company: "Avery Clinic",
      date: "June 15, 2025",
      amount: 151.35,
      status: "failed" as const,
      type: "debit" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto relative pb-24">
        <DashboardHeader userName="JOHN DOE" hasNotifications={true} />

        <div className="p-4 space-y-4">
          <div className="text-center py-2">
            <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
              DASHBOARD
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <StushBalance balance={360.50} todayEarnings={120.00} />
            
            <TimeOnClock workHours={19.00} hourlyRate={20.00} />
            
            <PayPeriodInfo 
              startDate="MARCH 1, 2025"
              endDate="MARCH 15, 2025"
              daysCompleted={8}
              totalDays={14}
            />
          </div>

          <QuickActions />

          <TransactionList transactions={mockTransactions} />
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
