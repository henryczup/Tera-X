'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { DesignState } from '@/types/antenna';
import { getGeneration, getTotalGenerations, getWinnerDesignId, getFinalRankings } from '@/lib/gaTimeline';
import { designCards } from '@/lib/designCards';
import { SParameterCurve } from '@/types/antenna';

interface UseRaceOptions {
  isPlaying: boolean;
  onGenerationChange?: (generation: number) => void;
  onRaceComplete?: () => void;
  speed?: number; // ms per generation
}

interface TrailData {
  [designId: string]: { x: number; y: number }[];
}

// Lerp function for smooth interpolation
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

// Interpolate S-parameter curves
const lerpSParams = (current: SParameterCurve, next: SParameterCurve, t: number): SParameterCurve => {
  return {
    frequency: current.frequency, // Frequencies are the same
    s11: current.s11.map((val, i) => lerp(val, next.s11[i], t)),
  };
};

export function useRace({
  isPlaying,
  onGenerationChange,
  onRaceComplete,
  speed = 100,
}: UseRaceOptions) {
  const [currentGeneration, setCurrentGeneration] = useState(0);
  const [designs, setDesigns] = useState<DesignState[]>([]);
  const [trails, setTrails] = useState<TrailData>({});
  const [raceComplete, setRaceComplete] = useState(false);

  const totalGenerations = getTotalGenerations();
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const progressRef = useRef<number>(0); // Fractional generation progress

  // Initialize designs from first generation
  useEffect(() => {
    const gen = getGeneration(0);
    setDesigns(gen.designs);

    // Initialize trails
    const initialTrails: TrailData = {};
    gen.designs.forEach(d => {
      initialTrails[d.designId] = [{ ...d.position }];
    });
    setTrails(initialTrails);
  }, []);

  // Smooth animation loop using requestAnimationFrame
  useEffect(() => {
    if (!isPlaying || raceComplete) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Update progress (fractional generations)
      progressRef.current += deltaTime / speed;

      const currentGen = Math.floor(progressRef.current);
      const t = progressRef.current - currentGen; // Interpolation factor (0-1)

      if (currentGen >= totalGenerations) {
        setRaceComplete(true);
        setCurrentGeneration(totalGenerations);
        const finalGen = getGeneration(totalGenerations);
        setDesigns(finalGen.designs);
        onRaceComplete?.();
        return;
      }

      // Get current and next generation data
      const genCurrent = getGeneration(currentGen);
      const genNext = getGeneration(Math.min(currentGen + 1, totalGenerations));

      // Interpolate positions and S-parameters smoothly
      const interpolatedDesigns: DesignState[] = genCurrent.designs.map((design, i) => {
        const nextDesign = genNext.designs[i];
        return {
          ...design,
          position: {
            x: lerp(design.position.x, nextDesign.position.x, t),
            y: lerp(design.position.y, nextDesign.position.y, t),
          },
          fitness: lerp(design.fitness, nextDesign.fitness, t),
          resonance: lerp(design.resonance, nextDesign.resonance, t),
          sParams: lerpSParams(design.sParams, nextDesign.sParams, t),
        };
      });

      setDesigns(interpolatedDesigns);
      setCurrentGeneration(currentGen);

      // Update trails periodically (every ~5 frames worth)
      if (Math.floor(progressRef.current * 3) !== Math.floor((progressRef.current - deltaTime / speed) * 3)) {
        setTrails(prevTrails => {
          const newTrails: TrailData = {};
          interpolatedDesigns.forEach(d => {
            const existingTrail = prevTrails[d.designId] || [];
            const trail = [...existingTrail, { x: d.position.x, y: d.position.y }].slice(-30);
            newTrails[d.designId] = trail;
          });
          return newTrails;
        });
      }

      if (currentGen !== Math.floor(progressRef.current - deltaTime / speed)) {
        onGenerationChange?.(currentGen);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = 0;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, raceComplete, speed, totalGenerations, onGenerationChange, onRaceComplete]);

  // Get current best design
  const getBestDesign = useCallback(() => {
    if (designs.length === 0) return null;
    return designs.reduce((best, current) =>
      current.fitness > best.fitness ? current : best
    );
  }, [designs]);

  // Get design by ID
  const getDesignById = useCallback((id: string) => {
    return designs.find(d => d.designId === id) || null;
  }, [designs]);

  // Get design card info by ID
  const getDesignCardById = useCallback((id: string) => {
    return designCards.find(c => c.id === id) || null;
  }, []);

  // Reset race
  const resetRace = useCallback(() => {
    setCurrentGeneration(0);
    setRaceComplete(false);
    progressRef.current = 0;
    lastTimeRef.current = 0;

    const gen = getGeneration(0);
    setDesigns(gen.designs);

    const initialTrails: TrailData = {};
    gen.designs.forEach(d => {
      initialTrails[d.designId] = [{ ...d.position }];
    });
    setTrails(initialTrails);
  }, []);

  // Get winner info
  const getWinner = useCallback(() => {
    if (!raceComplete) return null;
    const winnerId = getWinnerDesignId();
    const winnerDesign = getDesignById(winnerId);
    const winnerCard = getDesignCardById(winnerId);
    return { design: winnerDesign, card: winnerCard };
  }, [raceComplete, getDesignById, getDesignCardById]);

  // Get final rankings
  const getRankings = useCallback(() => {
    return getFinalRankings();
  }, []);

  // Get user's rank
  const getUserRank = useCallback((userId: string) => {
    const rankings = getRankings();
    const userRank = rankings.find(r => r.designId === userId);
    return userRank?.rank || null;
  }, [getRankings]);

  return {
    currentGeneration,
    totalGenerations,
    designs,
    trails,
    isComplete: raceComplete,
    getBestDesign,
    getDesignById,
    getDesignCardById,
    resetRace,
    getWinner,
    getRankings,
    getUserRank,
    progress: progressRef.current / totalGenerations,
  };
}
