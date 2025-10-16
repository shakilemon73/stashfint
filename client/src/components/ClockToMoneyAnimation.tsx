import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Coins } from "lucide-react";

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

  const clockNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  
  return (
    <div className="relative overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-1/5 via-card to-chart-2/5 rounded-2xl border border-border/50 shadow-lg" />
      
      <div className="relative px-6 py-6">
        <div className="relative flex items-center justify-between gap-8">
          {/* Balance with Coin Stack */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              {/* Coin Stack */}
              <div className="relative h-16 flex items-end">
                <motion.div 
                  className="w-14 h-4 rounded-full bg-gradient-to-br from-gold via-yellow-400 to-yellow-500 border-2 border-gold/70 shadow-lg"
                  animate={{ 
                    scale: isActive ? [1, 1.05, 1] : 1,
                    y: isActive ? [0, -2, 0] : 0 
                  }}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                />
                <motion.div 
                  className="absolute top-[-6px] left-0 w-14 h-4 rounded-full bg-gradient-to-br from-gold via-yellow-400 to-yellow-500 border-2 border-gold/70 shadow-lg"
                  animate={{ 
                    scale: isActive ? [1, 1.05, 1] : 1,
                    y: isActive ? [0, -2, 0] : 0 
                  }}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0, delay: 0.1 }}
                />
                <motion.div 
                  className="absolute top-[-12px] left-0 w-14 h-4 rounded-full bg-gradient-to-br from-gold via-yellow-400 to-yellow-500 border-2 border-gold/70 shadow-lg"
                  animate={{ 
                    scale: isActive ? [1, 1.05, 1] : 1,
                    y: isActive ? [0, -2, 0] : 0 
                  }}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0, delay: 0.2 }}
                />
              </div>

              {/* Balance Text */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Stush Wage Balance:
                </p>
                <p className="text-4xl font-bold text-foreground tabular-nums">
                  ${balance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Flying Coins Animation - from clock to stack */}
          <AnimatePresence>
            {coins.map((coin) => (
              <motion.div
                key={coin.id}
                className="absolute z-50"
                style={{ 
                  right: '35%',
                  top: '30%',
                  translateY: `${coin.startY}px` 
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
                animate={{ 
                  x: [-10, -100, -180, -250],
                  y: [0, -30, -20, 10],
                  opacity: [0, 1, 1, 0.8],
                  scale: [0.3, 0.8, 1, 0.7],
                  rotate: [0, 90, 180, 270],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 1.8,
                  ease: [0.4, 0.0, 0.2, 1],
                  times: [0, 0.3, 0.6, 1]
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gold/40 blur-md" />
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-gold via-yellow-400 to-yellow-600 border-3 border-yellow-300/70 shadow-2xl flex items-center justify-center">
                    <span className="text-lg font-bold text-white">$</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Clock Section */}
          <div className="flex-1 flex flex-col items-end space-y-4">
            <div className="relative">
              {/* Glow effect */}
              {isActive && (
                <>
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-chart-1/20"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 120, height: 120, left: -6, top: -6 }}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gold/10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    style={{ width: 120, height: 120, left: -6, top: -6 }}
                  />
                </>
              )}
              
              {/* Clock Face */}
              <div className={`relative w-28 h-28 rounded-full ${isActive ? 'bg-gradient-to-br from-chart-1 to-chart-2' : 'bg-gradient-to-br from-muted to-muted/80'} border-4 ${isActive ? 'border-white/30' : 'border-border'} shadow-2xl`}>
                {/* Clock Numbers */}
                {clockNumbers.map((num, index) => {
                  const angle = (index * 30 - 90) * (Math.PI / 180);
                  const radius = 40;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <div
                      key={num}
                      className={`absolute text-[10px] font-bold ${isActive ? 'text-white/90' : 'text-muted-foreground'} select-none`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                    >
                      {num}
                    </div>
                  );
                })}

                {/* Hour markers */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-0.5 h-2 ${isActive ? 'bg-white/40' : 'bg-muted-foreground/40'}`}
                    style={{
                      left: '50%',
                      top: '8px',
                      transformOrigin: '50% 48px',
                      transform: `translateX(-50%) rotate(${i * 30}deg)`
                    }}
                  />
                ))}

                {/* Hour Hand */}
                <div 
                  className={`absolute w-1 h-8 ${isActive ? 'bg-white' : 'bg-muted-foreground'} rounded-full origin-bottom`} 
                  style={{ 
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -100%) rotate(${(parseInt(hours) % 12) * 30 + parseInt(minutes) * 0.5}deg)` 
                  }} 
                />
                
                {/* Minute Hand */}
                <div 
                  className={`absolute w-0.5 h-11 ${isActive ? 'bg-white/90' : 'bg-muted-foreground/90'} rounded-full origin-bottom`} 
                  style={{ 
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -100%) rotate(${parseInt(minutes) * 6}deg)` 
                  }} 
                />

                {/* Center Dot */}
                <div className={`absolute top-1/2 left-1/2 w-3 h-3 rounded-full ${isActive ? 'bg-white' : 'bg-muted-foreground'} shadow-lg`} style={{ transform: 'translate(-50%, -50%)' }} />
              </div>
            </div>

            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status:</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-success-green animate-pulse' : 'bg-muted-foreground'}`} />
                  <span className={`text-xs font-bold ${isActive ? 'text-success-green' : 'text-muted-foreground'}`}>
                    {isActive ? 'On the Clock' : 'Off Duty'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Work Hours:</p>
                <p className={`text-2xl font-bold tabular-nums ${isActive ? 'text-chart-1' : 'text-muted-foreground'}`}>
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
