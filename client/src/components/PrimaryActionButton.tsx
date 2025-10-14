import { LucideIcon } from "lucide-react";

interface PrimaryActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  testId: string;
}

export default function PrimaryActionButton({ icon: Icon, label, onClick, testId }: PrimaryActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-chart-1 to-chart-2 text-black font-semibold text-base hover-elevate active-elevate-2 transition-all min-h-[56px]"
      data-testid={testId}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </button>
  );
}
