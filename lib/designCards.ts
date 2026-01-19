import { DesignCard } from '@/types/antenna';

// Generate a seeded random pattern
function generatePattern(seed: number): number[][] {
  let s = seed;
  const random = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };

  const size = 10;
  const grid: number[][] = [];

  for (let y = 0; y < size; y++) {
    const row: number[] = [];
    for (let x = 0; x < size; x++) {
      row.push(random() < 0.55 ? 1 : 0);
    }
    grid.push(row);
  }

  // Ensure bottom center has pixels for feed
  grid[9][4] = 1;
  grid[9][5] = 1;

  return grid;
}

// Generate 6 random patterns with fixed seeds for consistency
const patterns = {
  design1: generatePattern(12345),
  design2: generatePattern(67890),
  design3: generatePattern(11111),
  design4: generatePattern(22222),
  design5: generatePattern(33333),
  design6: generatePattern(44444),
};

export const designCards: DesignCard[] = [
  {
    id: 'design-1',
    name: 'Design 1',
    pixelGrid: patterns.design1,
    color: '#f97316', // Orange theme
  },
  {
    id: 'design-2',
    name: 'Design 2',
    pixelGrid: patterns.design2,
    color: '#f97316',
  },
  {
    id: 'design-3',
    name: 'Design 3',
    pixelGrid: patterns.design3,
    color: '#f97316',
  },
  {
    id: 'design-4',
    name: 'Design 4',
    pixelGrid: patterns.design4,
    color: '#f97316',
  },
  {
    id: 'design-5',
    name: 'Design 5',
    pixelGrid: patterns.design5,
    color: '#f97316',
  },
  {
    id: 'design-6',
    name: 'Design 6',
    pixelGrid: patterns.design6,
    color: '#f97316',
  },
];

export const getDesignById = (id: string): DesignCard | undefined => {
  return designCards.find(card => card.id === id);
};
