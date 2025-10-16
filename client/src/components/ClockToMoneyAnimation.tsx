import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Clock, Sparkles } from "lucide-react";

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
        startY: Math.random() * 30 - 15,
      };
      setCoins(prev => [...prev, newCoin]);
      
      setTimeout(() => {
        setCoins(prev => prev.filter(c => c.id !== newCoin.id));
      }, 2500);
    }, 500);

    return () => clearInterval(coinInterval);
  }, [isActive]);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  const clockNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  
  return (
    <div className="relative overflow-visible pb-2" data-testid="card-balance-clock">
      {/* Main Card with enhanced gradient */}
      <div className="relative">
        {/* Animated background glow when active */}
        {isActive && (
          <>
            <motion.div 
              className="absolute -inset-2 bg-gradient-to-br from-gold/30 via-success-green/20 to-gold/30 rounded-3xl blur-2xl"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              aria-hidden="true"
            />
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-br from-gold/20 to-success-green/20 rounded-3xl blur-xl"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              aria-hidden="true"
            />
          </>
        )}
        
        <div className="relative bg-gradient-to-br from-card via-card to-card/95 rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
          {/* Shimmer effect overlay */}
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]" aria-hidden="true" />
          )}
          
          <div className="relative px-6 py-8">
            {/* THE STAR: Balance - Massive and Prominent */}
            <div className="text-center mb-8">
              <motion.div
                className="relative inline-block"
                animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              >
                {/* Stush Balance Label with sparkles */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  {isActive && (
                    <motion.div
                      animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-gold-bright" aria-hidden="true" />
                    </motion.div>
                  )}
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider" data-testid="text-balance-label">
                    Stush Balance
                  </p>
                  {isActive && (
                    <motion.div
                      animate={{ rotate: [360, 180, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-gold-bright" aria-hidden="true" />
                    </motion.div>
                  )}
                </div>

                {/* MASSIVE Balance Amount - The True Star */}
                <div className="relative">
                  {isActive && (
                    <>
                      {/* Intense glow effect */}
                      <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-gold-bright via-gold to-gold-bright opacity-40" aria-hidden="true" />
                      <div className="absolute inset-0 blur-xl bg-gradient-to-r from-gold via-gold-bright to-gold opacity-50" aria-hidden="true" />
                    </>
                  )}
                  
                  <motion.p 
                    className={`relative text-7xl md:text-8xl font-black tabular-nums leading-none ${
                      isActive 
                        ? 'gradient-text-gold-green drop-shadow-2xl' 
                        : 'text-foreground'
                    }`}
                    data-testid="text-balance-amount"
                    animate={isActive ? {
                      textShadow: [
                        '0 0 20px rgba(255, 215, 0, 0.5)',
                        '0 0 40px rgba(255, 215, 0, 0.8)',
                        '0 0 20px rgba(255, 215, 0, 0.5)',
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                  >
                    ${balance.toFixed(2)}
                  </motion.p>

                  {/* Animated dollar sign icon */}
                  <motion.div
                    className="absolute -left-16 top-1/2 -translate-y-1/2"
                    animate={isActive ? { 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ duration: 3, repeat: isActive ? Infinity : 0 }}
                  >
                    <div className="relative w-16 h-16">
                      {isActive && (
                        <div className="absolute inset-0 bg-gold/30 rounded-full blur-xl" aria-hidden="true" />
                      )}
                      <div className={`relative w-16 h-16 rounded-full ${
                        isActive ? 'bg-gradient-gold-green' : 'bg-muted'
                      } flex items-center justify-center shadow-xl`}>
                        <DollarSign className="w-9 h-9 text-white" strokeWidth={3} aria-hidden="true" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Flying Coins Animation - Enhanced */}
            <AnimatePresence>
              {coins.map((coin) => (
                <motion.div
                  key={coin.id}
                  className="absolute z-50 pointer-events-none"
                  style={{ 
                    left: '50%',
                    top: '40%',
                    translateY: `${coin.startY}px` 
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.2, rotate: 0 }}
                  animate={{ 
                    x: [0, -80, -160, -240],
                    y: [0, -30, -20, 15],
                    opacity: [0, 1, 1, 0],
                    scale: [0.2, 1.1, 1.2, 0.7],
                    rotate: [0, 120, 240, 360],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 1.8,
                    ease: [0.4, 0.0, 0.2, 1],
                    times: [0, 0.3, 0.6, 1]
                  }}
                  aria-hidden="true"
                >
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-gold-bright/40 rounded-full blur-md" />
                    <div className="relative w-12 h-12 rounded-full bg-gradient-gold-green shadow-2xl flex items-center justify-center">
                      <DollarSign className="w-7 h-7 text-white" strokeWidth={3} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clock and Status Row */}
            <div className="flex items-center justify-between gap-6 pt-6 mt-6 border-t border-border/40">
              {/* THE STAR: Live Clock - Larger and More Prominent */}
              <div className="relative" data-testid="clock-display">
                {isActive && (
                  <>
                    <motion.div 
                      className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 to-success-green/20"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      aria-hidden="true"
                    />
                    <motion.div 
                      className="absolute -inset-2 rounded-full bg-gold/30 blur-lg"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      aria-hidden="true"
                    />
                  </>
                )}
                
                <div className="relative">
                  <div className={`relative w-24 h-24 rounded-full ${
                    isActive 
                      ? 'bg-gradient-gold-green shadow-2xl animate-pulse-glow' 
                      : 'bg-gradient-to-br from-muted to-muted/70 shadow-lg'
                  } overflow-hidden border-4 ${isActive ? 'border-gold-bright/30' : 'border-border/30'}`}>
                    
                    {/* Glass overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" aria-hidden="true" />
                    
                    {/* Clock numbers */}
                    {clockNumbers.map((num, index) => {
                      const angle = (index * 30 - 90) * (Math.PI / 180);
                      const radius = 35;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      return (
                        <div
                          key={num}
                          className={`absolute text-xs font-bold ${isActive ? 'text-white' : 'text-muted-foreground'} select-none`}
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

                    {/* Tick marks */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-0.5 h-2 ${isActive ? 'bg-white/50' : 'bg-muted-foreground/40'}`}
                        style={{
                          left: '50%',
                          top: '6px',
                          transformOrigin: '50% 42px',
                          transform: `translateX(-50%) rotate(${i * 30}deg)`
                        }}
                        aria-hidden="true"
                      />
                    ))}

                    {/* Hour hand */}
                    <motion.div 
                      className={`absolute w-1.5 h-7 rounded-full origin-bottom ${isActive ? 'bg-white' : 'bg-muted-foreground'}`}
                      style={{ 
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -100%) rotate(${(parseInt(hours) % 12) * 30 + parseInt(minutes) * 0.5}deg)` 
                      }}
                      aria-hidden="true"
                    />
                    
                    {/* Minute hand */}
                    <motion.div 
                      className={`absolute w-1 h-10 rounded-full origin-bottom ${isActive ? 'bg-white/95' : 'bg-muted-foreground/90'}`}
                      style={{ 
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -100%) rotate(${parseInt(minutes) * 6}deg)` 
                      }}
                      aria-hidden="true"
                    />

                    {/* Center dot */}
                    <div className={`absolute top-1/2 left-1/2 w-3 h-3 rounded-full ${isActive ? 'bg-white' : 'bg-muted-foreground'} shadow-lg`} style={{ transform: 'translate(-50%, -50%)' }} aria-hidden="true" />
                  </div>

                  {/* Time Below Clock */}
                  <div className="text-center mt-3">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Time on Clock</p>
                    <p className={`text-2xl font-black tabular-nums ${isActive ? 'text-gold-bright' : 'text-muted-foreground'}`}>
                      {hours}:{minutes}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status and Work Hours */}
              <div className="flex-1 space-y-4">
                {/* Status */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-success-green' : 'bg-muted-foreground/60'}`} aria-hidden="true">
                      {isActive && (
                        <>
                          <motion.div 
                            className="absolute inset-0 rounded-full bg-success-green"
                            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <div className="absolute inset-0 rounded-full bg-success-green blur-md" />
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5" data-testid="text-status-label">Status</p>
                    <p className={`text-base font-bold ${isActive ? 'text-success-green' : 'text-muted-foreground'}`} data-testid="text-status-value">
                      {isActive ? 'On the Clock' : 'Off Duty'}
                    </p>
                  </div>
                </div>

                {/* Work Hours */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1" data-testid="text-hours-label">Hours Worked</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-3xl font-black tabular-nums ${isActive ? 'text-gold' : 'text-muted-foreground'}`} data-testid="text-hours-value">
                      {workHours.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">hrs</p>
                  </div>
                  <p className="text-xs text-muted-foreground/80 mt-1" data-testid="text-rate">
                    @ ${hourlyRate.toFixed(2)}/hr
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
