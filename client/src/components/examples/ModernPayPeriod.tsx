import ModernPayPeriod from "../ModernPayPeriod";

export default function ModernPayPeriodExample() {
  return (
    <ModernPayPeriod 
      startDate="Mar 1" 
      endDate="Mar 15" 
      daysCompleted={8} 
      totalDays={14} 
    />
  );
}
