import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, DollarSign } from "lucide-react";

interface ClockToMoneyAnimationProps {
  isActive: boolean;
  hourlyRate: number;
}

interface Coin {
  id: string;
  delay: number;
}

export default function ClockToMoneyAnimation({ isActive, hourlyRate }: ClockToMoneyAnimationProps) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCoins([]);
      return;
    }

    const coinInterval = setInterval(() => {
      const newCoin: Coin = {
        id: `coin-${Date.now()}-${Math.random()}`,
        delay: 0,
      };
      setCoins(prev => [...prev, newCoin]);
      
      setTimeout(() => {
        setCoins(prev => prev.filter(c => c.id !== newCoin.id));
      }, 2000);
    }, 800);

    return () => clearInterval(coinInterval);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 6) % 360);
    }, 100);

    return () => clearInterval(rotationInterval);
  }, [isActive]);

  return (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-1/5 via-gold/5 to-chart-2/5 rounded-3xl" />
      
      <div className="relative flex items-center justify-between w-full px-12">
        <motion.div 
          className="relative flex items-center justify-center"
          animate={{ scale: isActive ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
        >
          <div className={`absolute inset-0 rounded-full ${isActive ? 'bg-chart-1/20 animate-ping' : 'bg-muted/10'}`} style={{ width: 100, height: 100 }} />
          <div className={`relative w-24 h-24 rounded-full ${isActive ? 'bg-gradient-to-br from-chart-1 to-chart-2' : 'bg-muted'} flex items-center justify-center shadow-lg`}>
            <Clock className="w-12 h-12 text-white" style={{ transform: `rotate(${rotation}deg)` }} />
          </div>
        </motion.div>

        <AnimatePresence>
          {coins.map((coin) => (
            <motion.div
              key={coin.id}
              className="absolute left-1/4 top-1/2 -translate-y-1/2"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ 
                x: [0, 100, 200],
                y: [0, -30, 0],
                opacity: [1, 0.8, 0],
                scale: [1, 1.2, 0.5],
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut",
                delay: coin.delay,
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shadow-lg border-2 border-gold/50">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          className="relative"
          animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
        >
          <div className={`w-24 h-24 rounded-2xl ${isActive ? 'bg-success-green/20 border-2 border-success-green/40' : 'bg-muted/20 border-2 border-muted/40'} flex flex-col items-center justify-center shadow-lg`}>
            <DollarSign className={`w-8 h-8 ${isActive ? 'text-success-green' : 'text-muted-foreground'}`} />
            <span className={`text-sm font-bold mt-1 ${isActive ? 'text-success-green' : 'text-muted-foreground'}`}>
              ${hourlyRate}/hr
            </span>
          </div>
        </motion.div>
      </div>

      {isActive && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Money Flowing to Your Balance
          </p>
        </div>
      )}
    </div>
  );
}
