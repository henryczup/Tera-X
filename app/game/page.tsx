'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import CardSelector from '@/components/CardSelector';
import { GamePhase } from '@/types/antenna';
import { ShimmerButton } from '@/components/shimmer-button';

// Dynamic import for RaceLayout (contains Three.js)
const RaceLayout = dynamic(() => import('@/components/RaceLayout'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-tera">
      <div className="text-orange-500 animate-pulse text-xl">Loading Race...</div>
    </div>
  ),
});

// Dynamic import for Antenna Model
const AntennaModel = dynamic(() => import('@/components/AntennaModel'), {
  ssr: false,
  loading: () => (
    <div style={{ width: 180, height: 280 }} className="flex items-center justify-center">
      <div className="w-32 h-56 rounded-sm bg-muted animate-pulse" />
    </div>
  ),
});

export default function GamePage() {
  const [phase, setPhase] = useState<GamePhase>('landing');
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);

  const handleStart = useCallback(() => {
    setPhase('selection');
  }, []);

  const handleSelectDesign = useCallback((id: string) => {
    setSelectedDesignId(id);
  }, []);

  const handleConfirmSelection = useCallback(() => {
    if (selectedDesignId) {
      setPhase('racing');
    }
  }, [selectedDesignId]);

  const handlePlayAgain = useCallback(() => {
    setSelectedDesignId(null);
    setPhase('selection');
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden bg-tera">
      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <LandingPage key="landing" onStart={handleStart} />
        )}

        {phase === 'selection' && (
          <SelectionPage
            key="selection"
            selectedId={selectedDesignId}
            onSelect={handleSelectDesign}
            onConfirm={handleConfirmSelection}
          />
        )}

        {phase === 'racing' && selectedDesignId && (
          <motion.div
            key="racing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full"
          >
            <RaceLayout
              userPickId={selectedDesignId}
              onPlayAgain={handlePlayAgain}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Landing Page Component
function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* 3D Antenna Model */}
      <motion.div
        className="mb-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 100 }}
      >
        <AntennaModel />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-2 text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Pixelated Patch Antenna
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-muted-foreground text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Inverse Design via Genetic Algorithm Optimization
      </motion.p>

      {/* Brief explanation */}
      <motion.div
        className="p-5 max-w-xl mb-6 text-sm border border-border rounded-xl bg-card/50 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-muted-foreground mb-3">
          <span className="text-orange-500 font-semibold">Inverse design</span> flips the script: instead of designing a shape and checking its frequency,
          we specify our target frequency and let a genetic algorithm discover the optimal antenna pattern.
        </p>
        <p className="text-muted-foreground/70 text-xs">
          A 10×10 grid has <span className="text-orange-500 font-mono">10<sup>30</sup></span> possible configurations.
          The GA finds near-optimal solutions in just <span className="text-green-500">50 generations</span>.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="flex gap-6 mb-8 text-center flex-wrap justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="px-4 py-2 rounded-lg border border-border bg-card/50">
          <div className="text-lg font-mono text-orange-500">17.58 × 13.85 mm</div>
          <div className="text-xs text-muted-foreground">Patch Size</div>
        </div>
        <div className="px-4 py-2 rounded-lg border border-border bg-card/50">
          <div className="text-lg font-mono text-green-500">3.5 GHz</div>
          <div className="text-xs text-muted-foreground">Target Freq</div>
        </div>
        <div className="px-4 py-2 rounded-lg border border-border bg-card/50">
          <div className="text-lg font-mono text-orange-400">82.79%</div>
          <div className="text-xs text-muted-foreground">Size Reduction</div>
        </div>
      </motion.div>

      {/* Start button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
      >
        <ShimmerButton
          onClick={onStart}
          className="text-xl px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white dark:text-white"
        >
          Pick Your Design & Race!
        </ShimmerButton>
      </motion.div>
    </motion.div>
  );
}

// Selection Page Component
function SelectionPage({
  selectedId,
  onSelect,
  onConfirm,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onConfirm: () => void;
}) {
  return (
    <motion.div
      className="h-full w-full flex items-center justify-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <CardSelector
        selectedId={selectedId}
        onSelect={onSelect}
        onConfirm={onConfirm}
      />
    </motion.div>
  );
}
