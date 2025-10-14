import backgroundImage from "@assets/stock_images/abstract_gradient_ba_5c77e62a.jpg";
import { Download } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import HeroBalanceCard from "@/components/HeroBalanceCard";
import WorkStatusCard from "@/components/WorkStatusCard";
import PayPeriodCard from "@/components/PayPeriodCard";
import PrimaryActionButton from "@/components/PrimaryActionButton";
import SecondaryActions from "@/components/SecondaryActions";
import TransactionSection from "@/components/TransactionSection";
import SimpleBottomNav from "@/components/SimpleBottomNav";

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
    {
      id: "6",
      company: "Startup Co",
      date: "Mar 10",
      amount: 1250.00,
      status: "sent" as const,
      type: "credit" as const,
    },
  ];

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
      />
      
      <div className="fixed inset-0 z-0 bg-background/95" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <SimpleHeader userName="John Doe" hasNotifications={true} />

        <div className="flex-1 max-w-md mx-auto w-full pb-24">
          <div className="p-4 space-y-6">
            <HeroBalanceCard balance={2461.25} todayEarnings={130.00} />

            <div className="space-y-6 pt-2">
              <WorkStatusCard workHours={6.5} hourlyRate={20} status="active" />
              
              <PayPeriodCard 
                startDate="Mar 1"
                endDate="Mar 15"
                daysCompleted={8}
                totalDays={14}
              />
            </div>

            <div className="space-y-3 pt-2">
              <PrimaryActionButton
                icon={Download}
                label="Request Money"
                onClick={() => console.log('Request Money clicked')}
                testId="button-request-money"
              />

              <SecondaryActions />
            </div>

            <div className="pt-4">
              <TransactionSection transactions={mockTransactions} />
            </div>
          </div>
        </div>

        <SimpleBottomNav />
      </div>
    </div>
  );
}
