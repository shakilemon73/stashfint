import { useState } from "react";
import backgroundImage from "@assets/stock_images/abstract_gradient_ba_5c77e62a.jpg";
import { Download } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import HeroBalanceCard from "@/components/HeroBalanceCard";
import ClockToMoneyAnimation from "@/components/ClockToMoneyAnimation";
import WorkStatusCard from "@/components/WorkStatusCard";
import PayPeriodCard from "@/components/PayPeriodCard";
import PrimaryActionButton from "@/components/PrimaryActionButton";
import SecondaryActions from "@/components/SecondaryActions";
import TransactionSection from "@/components/TransactionSection";
import SimpleBottomNav from "@/components/SimpleBottomNav";

export default function Home() {
  const [workStatus, setWorkStatus] = useState<"active" | "paused" | "offline">("active");
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
    {
      id: "6",
      company: "Startup Co",
      date: "Mar 10",
      amount: 1250.00,
      status: "sent" as const,
      type: "credit" as const,
    },
  ];

  const handleToggleWork = () => {
    setWorkStatus(prev => {
      if (prev === "active") return "paused";
      if (prev === "paused") return "active";
      return "active";
    });
  };

  return (
    <div className="min-h-screen relative">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        role="img"
        aria-label="Abstract gradient background"
      />
      
      <div className="fixed inset-0 z-0 bg-background/95" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <SimpleHeader userName="John Doe" hasNotifications={true} notificationCount={3} />

        <main 
          className="flex-1 max-w-md mx-auto w-full pb-28"
          role="main"
          aria-label="Dashboard content"
        >
          <div className="p-4 space-y-6">
            <HeroBalanceCard balance={2461.25} todayEarnings={130.00} />

            <ClockToMoneyAnimation 
              isActive={workStatus === "active"} 
              balance={2461.25}
              workHours={6.5}
              hourlyRate={20} 
            />

            <section className="space-y-6 pt-2" aria-label="Work information">
              <WorkStatusCard 
                workHours={6.5} 
                hourlyRate={20} 
                status={workStatus} 
                onToggleStatus={handleToggleWork}
              />
              
              <PayPeriodCard 
                startDate="Mar 1"
                endDate="Mar 15"
                daysCompleted={8}
                totalDays={14}
              />
            </section>

            <section className="space-y-3 pt-2" aria-label="Quick actions">
              <PrimaryActionButton
                icon={Download}
                label="Request Money"
                onClick={() => console.log('Request Money clicked')}
                testId="button-request-money"
              />

              <SecondaryActions />
            </section>

            <section className="pt-4" aria-label="Transaction history">
              <TransactionSection transactions={mockTransactions} />
            </section>
          </div>
        </main>

        <SimpleBottomNav />
      </div>
    </div>
  );
}
