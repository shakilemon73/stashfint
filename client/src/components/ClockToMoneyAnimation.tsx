import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign } from "lucide-react";

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
    <div className="relative overflow-hidden" data-testid="card-balance-clock">
      <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-card/95 rounded-3xl border border-border/50 shadow-xl" />
      
      <div className="relative px-5 py-5">
        {/* Top Row: Balance and Clock */}
        <div className="flex items-center justify-between gap-4 mb-5">
          {/* Left: Balance with Semi-3D Icon */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Semi-3D Money Icon - Microsoft Word style */}
            <motion.div 
              className="relative w-14 h-14 flex-shrink-0" 
              aria-hidden="true"
              animate={{ 
                scale: isActive ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
            >
              {/* Shadow layer */}
              <div className="absolute inset-0 bg-gold/20 rounded-2xl blur-md translate-y-1" />
              
              {/* Main icon body - gradient with depth */}
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-gold via-yellow-400 to-yellow-600 shadow-lg overflow-hidden">
                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-white/30 to-transparent" />
                
                {/* Bottom shadow for depth */}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Dollar sign */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={3} />
                </div>
                
                {/* Edge highlight for 3D effect */}
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-r from-white/40 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-white/40 to-transparent" />
              </div>

              {/* Animated glow when active */}
              {isActive && (
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gold/30"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Balance Amount */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 truncate" data-testid="text-balance-label">
                Stush Wage Balance
              </p>
              <p className="text-3xl font-bold text-foreground tabular-nums leading-none truncate" data-testid="text-balance-amount">
                ${balance.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Flying Coins Animation - Semi 3D Style */}
          <AnimatePresence>
            {coins.map((coin) => (
              <motion.div
                key={coin.id}
                className="absolute z-50"
                style={{ 
                  right: '30%',
                  top: '30%',
                  translateY: `${coin.startY}px` 
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
                animate={{ 
                  x: [-10, -120, -200, -280],
                  y: [0, -25, -15, 10],
                  opacity: [0, 1, 1, 0],
                  scale: [0.3, 0.9, 1, 0.6],
                  rotate: [0, 90, 180, 270],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 1.6,
                  ease: [0.4, 0.0, 0.2, 1],
                  times: [0, 0.3, 0.6, 1]
                }}
                aria-hidden="true"
              >
                <div className="relative w-11 h-11">
                  {/* Shadow */}
                  <div className="absolute inset-0 bg-gold/30 rounded-xl blur-sm translate-y-0.5" />
                  
                  {/* Semi-3D coin */}
                  <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-gold via-yellow-400 to-yellow-600 shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white drop-shadow-md" strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Right: Clock - Enhanced 3D Style */}
          <div className="relative flex-shrink-0" data-testid="clock-display">
            {/* Glow effects */}
            {isActive && (
              <>
                <motion.div 
                  className="absolute inset-0 rounded-full bg-chart-1/20"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 90, height: 90, left: -5, top: -5 }}
                  aria-hidden="true"
                />
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gold/10"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  style={{ width: 90, height: 90, left: -5, top: -5 }}
                  aria-hidden="true"
                />
              </>
            )}
            
            {/* Clock outer ring shadow for depth */}
            <div className="absolute w-[84px] h-[84px] rounded-full bg-black/10 blur-sm translate-y-1" aria-hidden="true" />
            
            <div className={`relative w-[80px] h-[80px] rounded-full ${isActive ? 'bg-gradient-to-br from-chart-1 via-chart-1 to-chart-2' : 'bg-gradient-to-br from-muted via-muted/90 to-muted/70'} shadow-2xl overflow-hidden`}>
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" aria-hidden="true" />
              
              {/* Border with depth */}
              <div className={`absolute inset-0 rounded-full border-[3px] ${isActive ? 'border-white/30' : 'border-border/50'}`} aria-hidden="true" />
              {clockNumbers.map((num, index) => {
                const angle = (index * 30 - 90) * (Math.PI / 180);
                const radius = 28;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <div
                    key={num}
                    className={`absolute text-[8px] font-bold ${isActive ? 'text-white/95' : 'text-muted-foreground'} select-none`}
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

              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-0.5 h-1.5 ${isActive ? 'bg-white/40' : 'bg-muted-foreground/40'}`}
                  style={{
                    left: '50%',
                    top: '5px',
                    transformOrigin: '50% 35px',
                    transform: `translateX(-50%) rotate(${i * 30}deg)`
                  }}
                  aria-hidden="true"
                />
              ))}

              <div 
                className={`absolute w-1 h-5 ${isActive ? 'bg-white' : 'bg-muted-foreground'} rounded-full origin-bottom`} 
                style={{ 
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -100%) rotate(${(parseInt(hours) % 12) * 30 + parseInt(minutes) * 0.5}deg)` 
                }}
                aria-hidden="true"
              />
              
              <div 
                className={`absolute w-0.5 h-8 ${isActive ? 'bg-white/90' : 'bg-muted-foreground/90'} rounded-full origin-bottom`} 
                style={{ 
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -100%) rotate(${parseInt(minutes) * 6}deg)` 
                }}
                aria-hidden="true"
              />

              <div className={`absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : 'bg-muted-foreground'} shadow-sm`} style={{ transform: 'translate(-50%, -50%)' }} aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Bottom Row: Status and Work Hours - Improved spacing */}
        <div className="flex items-center justify-between gap-6 pt-4 mt-1 border-t border-border/40">
          {/* Left: Status Indicator */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-success-green shadow-lg shadow-success-green/50' : 'bg-muted-foreground/60'}`} aria-hidden="true">
                {isActive && (
                  <motion.div 
                    className="w-2.5 h-2.5 rounded-full bg-success-green"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider leading-none mb-0.5" data-testid="text-status-label">Status</p>
                <p className={`text-sm font-bold leading-none ${isActive ? 'text-success-green' : 'text-muted-foreground'}`} data-testid="text-status-value">
                  {isActive ? 'On the Clock' : 'Off Duty'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Right: Work Hours */}
          <div className="text-right">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider leading-none mb-0.5" data-testid="text-hours-label">Work Hours</p>
            <div className="flex items-baseline gap-2 justify-end">
              <p className={`text-2xl font-bold tabular-nums leading-none ${isActive ? 'text-gold' : 'text-muted-foreground'}`} data-testid="text-hours-value">
                {workHours.toFixed(2)} HRS
              </p>
              <p className="text-xs text-muted-foreground/80 leading-none" data-testid="text-rate">
                @ ${hourlyRate.toFixed(2)}/hr
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
