import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

interface ClockToMoneyAnimationProps {
  isActive: boolean;
  balance: number;
  workHours: number;
  hourlyRate: number;
}

interface Coin {
  id: string;
  startY: number;
}

export default function ClockToMoneyAnimation({ isActive, balance, workHours, hourlyRate }: ClockToMoneyAnimationProps) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isActive) {
      setCoins([]);
      return;
    }

    const coinInterval = setInterval(() => {
      const newCoin: Coin = {
        id: `coin-${Date.now()}-${Math.random()}`,
        startY: Math.random() * 20 - 10,
      };
      setCoins(prev => [...prev, newCoin]);
      
      setTimeout(() => {
        setCoins(prev => prev.filter(c => c.id !== newCoin.id));
      }, 2500);
    }, 600);

    return () => clearInterval(coinInterval);
  }, [isActive]);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-1/10 via-gold/10 to-chart-2/10 rounded-3xl" />
      
      <div className="relative px-6 py-8">
        <div className="relative flex items-center justify-between gap-6">
          {/* Balance with Coin Stack */}
          <div className="flex-1 space-y-3">
            <div className="relative h-24 flex items-end justify-start">
              {/* Coin Stack */}
              <div className="relative">
                <motion.div 
                  className="w-16 h-4 rounded-full bg-gold border-2 border-gold/60 shadow-lg"
                  animate={{ 
                    scale: isActive ? [1, 1.05, 1] : 1,
                    y: isActive ? [0, -2, 0] : 0 
                  }}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                />
                <motion.div 
                  className="absolute top-[-6px] left-0 w-16 h-4 rounded-full bg-gold border-2 border-gold/60 shadow-lg"
                  animate={{ 
                    scale: isActive ? [1, 1.05, 1] : 1,
                    y: isActive ? [0, -2, 0] : 0 
                  }}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0, delay: 0.1 }}
                />
                <motion.div 
                  className="absolute top-[-12px] left-0 w-16 h-4 rounded-full bg-gold border-2 border-gold/60 shadow-lg"
                  animate={{ 
                    scale: isActive ? [1, 1.05, 1] : 1,
                    y: isActive ? [0, -2, 0] : 0 
                  }}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0, delay: 0.2 }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Stush Wage Balance:
              </p>
              <p className="text-3xl font-bold text-foreground tabular-nums">
                ${balance.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Flying Coins Animation - from clock to stack */}
          <AnimatePresence>
            {coins.map((coin) => (
              <motion.div
                key={coin.id}
                className="absolute top-1/2"
                style={{ 
                  right: '15%',
                  translateY: `${coin.startY}px` 
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{ 
                  x: [0, -200, -400],
                  y: [0, -25, 15],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.6],
                  rotate: [0, 180, 360],
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 2,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-yellow-600 border-2 border-gold/50 shadow-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">$</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Clock Section */}
          <div className="flex-1 flex flex-col items-end space-y-3">
            <div className="relative">
              {isActive && (
                <motion.div 
                  className="absolute inset-0 rounded-full bg-chart-1/20"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 100, height: 100 }}
                />
              )}
              <div className={`relative w-24 h-24 rounded-full ${isActive ? 'bg-gradient-to-br from-chart-1 to-chart-2' : 'bg-muted'} border-4 ${isActive ? 'border-white/20' : 'border-muted/40'} flex items-center justify-center shadow-xl`}>
                <Clock className={`w-10 h-10 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                {/* Clock Hands */}
                <div className={`absolute top-1/2 left-1/2 w-0.5 h-7 ${isActive ? 'bg-white' : 'bg-muted-foreground'} origin-bottom`} style={{ transform: `translate(-50%, -100%) rotate(${(parseInt(hours) % 12) * 30 + parseInt(minutes) * 0.5}deg)` }} />
                <div className={`absolute top-1/2 left-1/2 w-0.5 h-9 ${isActive ? 'bg-white/80' : 'bg-muted-foreground/80'} origin-bottom`} style={{ transform: `translate(-50%, -100%) rotate(${parseInt(minutes) * 6}deg)` }} />
                <div className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-muted-foreground'}`} style={{ transform: 'translate(-50%, -50%)' }} />
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-xs font-semibold text-muted-foreground">Status:</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-success-green animate-pulse' : 'bg-muted-foreground'}`} />
                  <span className={`text-xs font-bold ${isActive ? 'text-success-green' : 'text-muted-foreground'}`}>
                    {isActive ? 'On the Clock' : 'Off Duty'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-muted-foreground">Work Hours:</p>
                <p className={`text-xl font-bold tabular-nums ${isActive ? 'text-chart-1' : 'text-muted-foreground'}`}>
                  {workHours.toFixed(2)} HRS.
                </p>
                <p className="text-xs text-muted-foreground">
                  @ ${hourlyRate.toFixed(2)}/hr
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
