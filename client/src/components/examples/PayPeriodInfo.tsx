import PayPeriodInfo from "../PayPeriodInfo";

export default function PayPeriodInfoExample() {
  return (
    <PayPeriodInfo 
      startDate="March 1, 2025" 
      endDate="March 15, 2025" 
      daysCompleted={8} 
      totalDays={14} 
    />
  );
}
