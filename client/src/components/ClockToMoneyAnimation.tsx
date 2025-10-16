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
    <div className="relative overflow-visible" data-testid="card-balance-clock">
      {/* Card Background - Material Design elevation */}
      <div className="absolute inset-0 bg-card rounded-2xl border border-border shadow-md" />
      
      {/* 16dp padding (native mobile standard) */}
      <div className="relative px-4 py-4">
        <div className="relative flex items-start justify-between gap-4">
          {/* Balance Section - Following 8dp grid system */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              {/* Coin Stack - Visual affordance (Don Norman) */}
              <div className="relative h-12 flex items-end flex-shrink-0" aria-hidden="true">
                <motion.div 
                  className="w-12 h-3 rounded-full bg-gradient-to-br from-gold via-yellow-400 to-yellow-500 border-2 border-gold/70 shadow-md"
                  animate={{ 
                    scale: isActive ? [1, 1.05, 1] : 1,
                    y: isActive ? [0, -2, 0] : 0 
                  }}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                />
                <motion.div 
                  className="absolute top-[-5px] left-0 w-12 h-3 rounded-full bg-gradient-to-br from-gold via-yellow-400 to-yellow-500 border-2 border-gold/70 shadow-md"
                  animate={{ 
                    scale: isActive ? [1, 1.05, 1] : 1,
                    y: isActive ? [0, -2, 0] : 0 
                  }}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0, delay: 0.1 }}
                />
                <motion.div 
                  className="absolute top-[-10px] left-0 w-12 h-3 rounded-full bg-gradient-to-br from-gold via-yellow-400 to-yellow-500 border-2 border-gold/70 shadow-md"
                  animate={{ 
                    scale: isActive ? [1, 1.05, 1] : 1,
                    y: isActive ? [0, -2, 0] : 0 
                  }}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0, delay: 0.2 }}
                />
              </div>

              {/* Balance Text - Optimized for scanning (Steve Krug) */}
              <div className="flex-1 min-w-0">
                {/* 12sp caption (Android) / 12pt caption (iOS) */}
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1" data-testid="text-balance-label">
                  Stush Wage Balance:
                </p>
                {/* 32sp headline (Android) / 28pt large title (iOS) */}
                <p className="text-3xl font-bold text-foreground tabular-nums leading-tight" data-testid="text-balance-amount">
                  ${balance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Flying Coins Animation - Emotional design (Aarron Walter) */}
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
                aria-hidden="true"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gold/40 blur-sm" />
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gold via-yellow-400 to-yellow-600 border-2 border-yellow-300/70 shadow-lg flex items-center justify-center">
                    <span className="text-base font-bold text-white">$</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Clock Section - Minimal design (Dieter Rams) */}
          <div className="flex-1 flex flex-col items-end min-w-0">
            {/* Clock - 88dp/pt touch target (native standard) */}
            <div className="relative mb-3" data-testid="clock-display">
              {/* Feedback animation (Don Norman) */}
              {isActive && (
                <>
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-chart-1/20"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 96, height: 96, left: -4, top: -4 }}
                    aria-hidden="true"
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gold/10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    style={{ width: 96, height: 96, left: -4, top: -4 }}
                    aria-hidden="true"
                  />
                </>
              )}
              
              {/* Clock Face - 88dp size (Material Design touch target) */}
              <div className={`relative w-[88px] h-[88px] rounded-full ${isActive ? 'bg-gradient-to-br from-chart-1 to-chart-2' : 'bg-gradient-to-br from-muted to-muted/70'} border-[3px] ${isActive ? 'border-white/30' : 'border-border'} shadow-lg`}>
                {/* Clock Numbers - Accessibility (Farai Madzima) */}
                {clockNumbers.map((num, index) => {
                  const angle = (index * 30 - 90) * (Math.PI / 180);
                  const radius = 32;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <div
                      key={num}
                      className={`absolute text-[9px] font-bold ${isActive ? 'text-white/95' : 'text-muted-foreground'} select-none`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                      aria-hidden="true"
                    >
                      {num}
                    </div>
                  );
                })}

                {/* Hour markers - Visual hierarchy (Susan Weinschenk) */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-0.5 h-1.5 ${isActive ? 'bg-white/40' : 'bg-muted-foreground/40'}`}
                    style={{
                      left: '50%',
                      top: '6px',
                      transformOrigin: '50% 38px',
                      transform: `translateX(-50%) rotate(${i * 30}deg)`
                    }}
                    aria-hidden="true"
                  />
                ))}

                {/* Hour Hand */}
                <div 
                  className={`absolute w-1 h-6 ${isActive ? 'bg-white' : 'bg-muted-foreground'} rounded-full origin-bottom`} 
                  style={{ 
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -100%) rotate(${(parseInt(hours) % 12) * 30 + parseInt(minutes) * 0.5}deg)` 
                  }}
                  aria-hidden="true"
                />
                
                {/* Minute Hand */}
                <div 
                  className={`absolute w-0.5 h-9 ${isActive ? 'bg-white/90' : 'bg-muted-foreground/90'} rounded-full origin-bottom`} 
                  style={{ 
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -100%) rotate(${parseInt(minutes) * 6}deg)` 
                  }}
                  aria-hidden="true"
                />

                {/* Center Dot */}
                <div className={`absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : 'bg-muted-foreground'} shadow-sm`} style={{ transform: 'translate(-50%, -50%)' }} aria-hidden="true" />
              </div>
            </div>

            {/* Status & Info - Information chunking (Susan Weinschenk) */}
            <div className="text-right w-full">
              {/* Status Indicator - Clear signifiers (Don Norman) */}
              <div className="flex items-center gap-2 justify-end mb-2">
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide" data-testid="text-status-label">Status:</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-success-green animate-pulse' : 'bg-muted-foreground'}`} aria-hidden="true" />
                  <span className={`text-sm font-semibold ${isActive ? 'text-success-green' : 'text-muted-foreground'}`} data-testid="text-status-value">
                    {isActive ? 'On the Clock' : 'Off Duty'}
                  </span>
                </div>
              </div>
              
              {/* Work Hours - Scannable layout (Steve Krug) */}
              <div className="space-y-0.5">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide" data-testid="text-hours-label">Work Hours:</p>
                {/* 20sp title (Android) / 20pt title3 (iOS) */}
                <p className={`text-xl font-bold tabular-nums ${isActive ? 'text-chart-1' : 'text-muted-foreground'}`} data-testid="text-hours-value">
                  {workHours.toFixed(2)} HRS.
                </p>
                {/* 12sp body2 (Android) / 12pt footnote (iOS) */}
                <p className="text-xs text-muted-foreground" data-testid="text-rate">
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
