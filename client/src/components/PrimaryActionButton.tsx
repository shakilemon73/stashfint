import { useState, useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";

interface PrimaryActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  testId: string;
  variant?: "default" | "success" | "warning";
}

export default function PrimaryActionButton({ 
  icon: Icon, 
  label, 
  onClick, 
  testId,
  variant = "default" 
}: PrimaryActionButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    setIsPressed(true);
    onClick();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsPressed(false);
      timeoutRef.current = null;
    }, 200);
  };

  const variants = {
    default: "bg-gradient-to-r from-chart-1 to-chart-2 text-black",
    success: "bg-success-green text-white",
    warning: "bg-gold text-black"
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-base hover-elevate active-elevate-2 transition-all duration-200 min-h-[56px] ${variants[variant]} ${isPressed ? 'scale-95' : 'scale-100'}`}
      data-testid={testId}
      aria-label={label}
    >
      <Icon className="w-6 h-6" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
