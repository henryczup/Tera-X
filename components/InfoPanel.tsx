'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface InfoPanelProps {
  generation: number;
  totalGenerations: number;
  bestFitness: number;
  userFitness: number;
}

export default function InfoPanel({
  generation,
  totalGenerations,
  bestFitness,
  userFitness,
}: InfoPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const progress = generation / totalGenerations;
  const phase = progress < 0.2 ? 'exploration' : progress < 0.6 ? 'exploitation' : 'convergence';
  
  const phaseInfo = {
    exploration: {
      title: 'Exploration Phase',
      description: 'The GA is exploring diverse regions of the design space, trying many different pixel configurations.',
      color: '#f97316', // orange-500
    },
    exploitation: {
      title: 'Exploitation Phase',
      description: 'Good designs are being refined. Crossover combines successful patterns while mutations fine-tune.',
      color: '#fb923c', // orange-400
    },
    convergence: {
      title: 'Convergence Phase',
      description: 'Designs are converging toward optimal solutions. The best configurations dominate the population.',
      color: '#22c55e', // green-500
    },
  };
  
  const currentPhase = phaseInfo[phase];
  
  return (
    <motion.div
      className="absolute bottom-4 left-4 z-10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-3 py-2 flex items-center gap-2 cursor-pointer border border-border rounded-xl bg-card/80 backdrop-blur-sm hover:border-orange-500/50 transition-colors"
      >
        <span className="text-lg">💡</span>
        <span className="text-sm text-muted-foreground">
          {isExpanded ? 'Hide Info' : 'What&apos;s happening?'}
        </span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-orange-500"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="p-4 mt-2 w-80 border border-border rounded-xl bg-card/95 backdrop-blur-sm"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
          >
            {/* Current Phase */}
            <div className="mb-4">
              <div
                className="text-sm font-bold mb-1"
                style={{ color: currentPhase.color }}
              >
                {currentPhase.title}
              </div>
              <p className="text-xs text-muted-foreground">
                {currentPhase.description}
              </p>
            </div>

            {/* Progress indicators */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Best Fitness:</span>
                <span className="font-mono text-green-500">
                  {(bestFitness * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Your Design:</span>
                <span className="font-mono text-orange-500">
                  {(userFitness * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* GA Operators Legend */}
            <div className="mt-4 pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground mb-2">GA Operators Active:</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-orange-500/10 text-orange-500 text-xs border border-orange-500/20">
                  Selection
                </span>
                <span className="px-2 py-1 rounded bg-orange-400/10 text-orange-400 text-xs border border-orange-400/20">
                  Crossover
                </span>
                <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs border border-green-500/20">
                  Mutation
                </span>
              </div>
            </div>

            {/* Inverse Design Reminder */}
            <div className="mt-3 p-2 rounded bg-muted/50 border border-border text-xs text-muted-foreground">
              <strong className="text-foreground">Inverse Design:</strong> Instead of designing
              the shape and checking the frequency, we specify the target frequency (3.5 GHz)
              and let the GA discover the optimal pixel pattern.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
