import backgroundImage from "@assets/stock_images/abstract_gradient_ba_5c77e62a.jpg";
import ModernHeader from "@/components/ModernHeader";
import ModernTimeBalance from "@/components/ModernTimeBalance";
import ModernPayPeriod from "@/components/ModernPayPeriod";
import ModernQuickActions from "@/components/ModernQuickActions";
import ModernTransactionList from "@/components/ModernTransactionList";
import ModernBottomNav from "@/components/ModernBottomNav";

export default function Home() {
  const mockTransactions = [
    {
      id: "1",
      company: "TechCorp Solutions",
      date: "Today, 2:30 PM",
      amount: 360.50,
      status: "sent" as const,
      type: "credit" as const,
    },
    {
      id: "2",
      company: "Digital Ventures Inc",
      date: "Today, 11:15 AM",
      amount: 280.75,
      status: "sent" as const,
      type: "credit" as const,
    },
    {
      id: "3",
      company: "Creative Labs",
      date: "Yesterday",
      amount: 1300.00,
      status: "pending" as const,
      type: "credit" as const,
    },
    {
      id: "4",
      company: "Global Systems",
      date: "Mar 12",
      amount: 520.00,
      status: "sent" as const,
      type: "credit" as const,
    },
    {
      id: "5",
      company: "Innovation Hub",
      date: "Mar 11",
      amount: 89.99,
      status: "failed" as const,
      type: "debit" as const,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />

      <div className="relative z-10 min-h-screen">
        <div className="max-w-md mx-auto pb-32">
          <ModernHeader userName="JOHN DOE" hasNotifications={true} />

          <div className="p-4 space-y-5">
            <div className="text-center py-4">
              <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-chart-1 via-gold to-chart-2 bg-clip-text text-transparent">
                DASHBOARD
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Track your earnings in real-time</p>
            </div>

            <ModernTimeBalance 
              balance={2461.25} 
              workHours={6.5} 
              hourlyRate={20} 
              todayEarnings={130.00} 
            />

            <ModernPayPeriod 
              startDate="Mar 1"
              endDate="Mar 15"
              daysCompleted={8}
              totalDays={14}
            />

            <ModernQuickActions />

            <ModernTransactionList transactions={mockTransactions} />
          </div>

          <ModernBottomNav />
        </div>
      </div>
    </div>
  );
}
