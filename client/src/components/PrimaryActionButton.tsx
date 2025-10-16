import { useState, useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

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
    default: {
      bg: "gradient-gold-green",
      text: "text-white",
      glow: "from-gold-glow/40 to-green-glow/40"
    },
    success: {
      bg: "bg-success-green",
      text: "text-white",
      glow: "from-green-glow/40 to-green-glow/40"
    },
    warning: {
      bg: "gradient-gold",
      text: "text-white",
      glow: "from-gold-glow/40 to-gold-glow/40"
    }
  };

  const currentVariant = variants[variant];

  return (
    <motion.button
      onClick={handleClick}
      className="relative w-full group"
      data-testid={testId}
      aria-label={label}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated glow effect */}
      <motion.div 
        className={`absolute -inset-1 bg-gradient-to-r ${currentVariant.glow} rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      />

      {/* Button */}
      <div className={`relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-base transition-all duration-200 min-h-[56px] shadow-xl ${currentVariant.bg} ${currentVariant.text} ${isPressed ? 'scale-95' : 'scale-100'}`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl" aria-hidden="true" />
        
        <Icon className="w-6 h-6 relative z-10 drop-shadow-lg" aria-hidden="true" />
        <span className="relative z-10">{label}</span>
      </div>
    </motion.button>
  );
}
