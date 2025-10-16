import { motion } from "framer-motion";

interface StushLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export default function StushLogo({ size = "md", animated = false, className = "" }: StushLogoProps) {
  const sizes = {
    sm: { width: 80, height: 32, fontSize: "text-xl" },
    md: { width: 120, height: 48, fontSize: "text-3xl" },
    lg: { width: 160, height: 64, fontSize: "text-5xl" }
  };

  const { width, height, fontSize } = sizes[size];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`} data-testid="logo-stush">
      {/* Icon - Dollar Sign in Circle with Gradient */}
      <motion.div 
        className="relative flex-shrink-0"
        style={{ width: height, height }}
        animate={animated ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 3, repeat: animated ? Infinity : 0 }}
      >
        {/* Glow effect */}
        {animated && (
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-gold-green opacity-30 blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden="true"
          />
        )}
        
        {/* Main circle */}
        <div className="relative w-full h-full rounded-full bg-gradient-gold-green p-1 shadow-xl">
          {/* Inner white circle */}
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            {/* Dollar sign */}
            <span className={`${fontSize} font-black gradient-text-gold-green`}>
              $
            </span>
          </div>
        </div>
      </motion.div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <motion.span 
          className={`${fontSize} font-black tracking-tight gradient-text-gold-green`}
          animate={animated ? {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          } : {}}
          transition={{ duration: 5, repeat: animated ? Infinity : 0 }}
        >
          STUSH
        </motion.span>
        <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-0.5">
          Wage Access
        </span>
      </div>
    </div>
  );
}
