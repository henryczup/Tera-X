import { GAGeneration, DesignState } from '@/types/antenna';
import { designCards } from './designCards';
import { lossLandscape, getHeightAt } from './lossLandscapeData';
import { generateS11ForFitness, getResonanceFromFitness } from './sParameterData';

const TOTAL_GENERATIONS = 50;

// Global optimum position (all particles converge here)
const GLOBAL_OPTIMUM = { x: 35, y: 35 };

// Starting positions for each design (spread around the landscape)
const startingPositions: { [key: string]: { x: number; y: number } } = {
  'design-1': { x: 5, y: 5 },
  'design-2': { x: 45, y: 8 },
  'design-3': { x: 8, y: 42 },
  'design-4': { x: 42, y: 45 },
  'design-5': { x: 25, y: 5 },
  'design-6': { x: 5, y: 25 },
};

// Speed factor for each design (how fast they converge) - winner is fastest
const convergenceSpeed: { [key: string]: number } = {
  'design-1': 0.7,
  'design-2': 1.0,   // WINNER - fastest
  'design-3': 0.6,
  'design-4': 0.75,
  'design-5': 0.65,
  'design-6': 0.9,   // 2nd place
};

// Delay before each design starts moving toward global optimum
const startDelay: { [key: string]: number } = {
  'design-1': 0.1,
  'design-2': 0.0,   // WINNER - no delay
  'design-3': 0.15,
  'design-4': 0.08,
  'design-5': 0.12,
  'design-6': 0.03,
};

// Seeded random function
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

// Generate evolved pixel grid (simulating GA mutations)
const evolvePixelGrid = (
  baseGrid: number[][],
  generation: number,
  designId: string
): number[][] => {
  const seed = designId.charCodeAt(designId.length - 1) + generation;

  return baseGrid.map((row, i) =>
    row.map((cell, j) => {
      // Keep feed connection (row 9, cols 4-5) always on
      if (i === 9 && (j === 4 || j === 5)) return 1;

      // Mutation probability decreases over generations
      const mutationProb = 0.08 * (1 - generation / TOTAL_GENERATIONS);
      if (seededRandom(seed + i * 10 + j) < mutationProb) {
        return cell === 1 ? 0 : 1;
      }
      return cell;
    })
  );
};

// Smooth easing function
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

// Generate PSO-like path with attraction to global optimum
const generatePosition = (
  designId: string,
  generationNum: number
): { x: number; y: number } => {
  const start = startingPositions[designId];
  const speed = convergenceSpeed[designId];
  const delay = startDelay[designId];

  // Adjust progress based on delay and speed
  const rawProgress = generationNum / TOTAL_GENERATIONS;
  const delayedProgress = Math.max(0, (rawProgress - delay) / (1 - delay));
  const progress = easeOutQuart(Math.min(1, delayedProgress * speed + delayedProgress * (1 - speed) * 0.5));

  // Base position moving toward global optimum
  const baseX = start.x + (GLOBAL_OPTIMUM.x - start.x) * progress;
  const baseY = start.y + (GLOBAL_OPTIMUM.y - start.y) * progress;

  // Add PSO-like wandering (decreases as we approach target)
  const wanderAmount = (1 - progress) * 8;
  const seed = designId.charCodeAt(designId.length - 1);
  const noiseX = Math.sin(generationNum * 0.15 + seed * 1.5) * wanderAmount;
  const noiseY = Math.cos(generationNum * 0.12 + seed * 2.1) * wanderAmount;

  // Add some spiral motion toward target
  const spiralAmount = (1 - progress) * 3;
  const spiralX = Math.cos(generationNum * 0.08 + seed) * spiralAmount;
  const spiralY = Math.sin(generationNum * 0.08 + seed) * spiralAmount;

  const x = Math.max(0, Math.min(lossLandscape.width - 1, baseX + noiseX + spiralX));
  const y = Math.max(0, Math.min(lossLandscape.height - 1, baseY + noiseY + spiralY));

  return { x, y };
};

// Generate a single generation's state
const generateGeneration = (generationNum: number): GAGeneration => {
  const designs: DesignState[] = designCards.map((card, index) => {
    const position = generatePosition(card.id, generationNum);
    const fitness = getHeightAt(position.x, position.y);
    const resonance = getResonanceFromFitness(fitness);
    // Each design gets a unique seed for different S-param characteristics
    const designSeed = (index + 1) * 100;
    const sParams = generateS11ForFitness(fitness, designSeed);
    const pixelGrid = evolvePixelGrid(card.pixelGrid, generationNum, card.id);

    return {
      designId: card.id,
      pixelGrid,
      position,
      fitness,
      resonance,
      sParams,
    };
  });

  // Find best design
  const bestDesign = designs.reduce((best, current) =>
    current.fitness > best.fitness ? current : best
  );

  return {
    generation: generationNum,
    designs,
    bestDesignId: bestDesign.designId,
  };
};

// Generate all generations
export const gaTimeline: GAGeneration[] = Array.from(
  { length: TOTAL_GENERATIONS + 1 },
  (_, i) => generateGeneration(i)
);

// Get a specific generation
export const getGeneration = (gen: number): GAGeneration => {
  const clampedGen = Math.max(0, Math.min(TOTAL_GENERATIONS, gen));
  return gaTimeline[clampedGen];
};

// Get total number of generations
export const getTotalGenerations = (): number => TOTAL_GENERATIONS;

// Get the winning design ID
export const getWinnerDesignId = (): string => {
  return gaTimeline[TOTAL_GENERATIONS].bestDesignId;
};

// Get final rankings
export const getFinalRankings = (): { designId: string; fitness: number; rank: number }[] => {
  const finalGen = gaTimeline[TOTAL_GENERATIONS];
  const sorted = [...finalGen.designs].sort((a, b) => b.fitness - a.fitness);
  return sorted.map((design, index) => ({
    designId: design.designId,
    fitness: design.fitness,
    rank: index + 1,
  }));
};
