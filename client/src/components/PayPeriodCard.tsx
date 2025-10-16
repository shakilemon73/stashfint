import { Calendar, ChevronRight, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface PayPeriodCardProps {
  startDate: string;
  endDate: string;
  daysCompleted: number;
  totalDays: number;
}

export default function PayPeriodCard({ startDate, endDate, daysCompleted, totalDays }: PayPeriodCardProps) {
  const progress = (daysCompleted / totalDays) * 100;
  const daysRemaining = totalDays - daysCompleted;
  const isAlmostComplete = progress >= 75;
  const isHalfway = progress >= 50 && progress < 75;

  return (
    <motion.button
      onClick={() => console.log('View pay period details')}
      className="w-full text-left group relative"
      data-testid="card-pay-period"
      aria-label={`Pay period from ${startDate} to ${endDate}, ${daysCompleted} of ${totalDays} days completed`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Glow effect for high progress */}
      {isAlmostComplete && (
        <motion.div 
          className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-success-green/20 rounded-3xl blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        />
      )}

      <div className="relative space-y-4 hover-elevate active-elevate-2 p-5 rounded-2xl border border-border/30 bg-card transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 overflow-hidden">
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Enhanced Calendar Icon */}
            <motion.div 
              className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-success-green/20 border border-gold/30 flex items-center justify-center"
              animate={isAlmostComplete ? {
                rotate: [0, -3, 3, 0],
              } : {}}
              transition={{ duration: 2, repeat: isAlmostComplete ? Infinity : 0 }}
            >
              {isAlmostComplete && (
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gold/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden="true"
                />
              )}
              <Calendar className="w-7 h-7 text-gold relative z-10" aria-hidden="true" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pay Period</p>
                {isAlmostComplete && (
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-3 h-3 text-gold" aria-hidden="true" />
                  </motion.div>
                )}
              </div>
              <p className="font-bold text-foreground text-base truncate" data-testid="text-pay-period">
                {startDate} - {endDate}
              </p>
            </div>
          </div>

          {/* Days Completed with celebration */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <motion.p 
                className={`text-4xl font-black font-display tabular-nums leading-none ${
                  isAlmostComplete ? 'gradient-text-gold-green' : 'text-gold'
                }`}
                data-testid="text-period-progress"
                animate={isAlmostComplete ? {
                  scale: [1, 1.08, 1],
                } : {}}
                transition={{ duration: 1.5, repeat: isAlmostComplete ? Infinity : 0 }}
              >
                {daysCompleted}
              </motion.p>
              <p className="text-xs text-muted-foreground font-semibold mt-1">of {totalDays} days</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="space-y-3">
          <div className="relative">
            {/* Background track */}
            <div className="relative h-4 rounded-full bg-muted/20 overflow-hidden shadow-inner">
              {/* Progress fill with gradient */}
              <motion.div 
                className={`absolute inset-y-0 left-0 rounded-full shadow-lg ${
                  isAlmostComplete 
                    ? 'bg-gradient-gold-green' 
                    : isHalfway 
                      ? 'bg-gradient-to-r from-gold to-success-green/70'
                      : 'bg-gradient-to-r from-chart-1 to-chart-2'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                data-testid="progress-pay-period"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {/* Shimmer effect inside progress */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" aria-hidden="true" />
              </motion.div>

              {/* Milestone markers */}
              <div className="absolute inset-y-0 left-1/4 w-0.5 bg-border/40" aria-hidden="true" />
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-border/60" aria-hidden="true" />
              <div className="absolute inset-y-0 left-3/4 w-0.5 bg-border/40" aria-hidden="true" />

              {/* Animated glow on progress edge */}
              {progress > 0 && (
                <motion.div 
                  className="absolute inset-y-0 bg-gradient-to-r from-transparent to-gold/50 blur-sm"
                  style={{ 
                    left: `${Math.max(0, progress - 8)}%`,
                    width: '8%'
                  }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>

          {/* Progress stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isAlmostComplete && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <TrendingUp className="w-4 h-4 text-success-green" aria-hidden="true" />
                </motion.div>
              )}
              <span className={`text-sm font-bold ${
                isAlmostComplete ? 'text-success-green' : 'text-foreground'
              }`}>
                {Math.round(progress)}% complete
              </span>
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
            </span>
          </div>

          {/* Celebration message for milestones */}
          {isAlmostComplete && (
            <motion.div 
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-gold/10 to-success-green/10 border border-gold/20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-gold-bright flex-shrink-0" aria-hidden="true" />
              <p className="text-xs font-semibold text-gold-bright">
                Almost there! Just {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} to payday!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
