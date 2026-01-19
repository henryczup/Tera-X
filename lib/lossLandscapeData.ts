import { LossLandscape } from '@/types/antenna';

// Generate a loss landscape with multiple local optima and one global optimum
// This creates an interesting terrain for the race visualization

const LANDSCAPE_SIZE = 50;

// Generate height map using multiple Gaussian peaks
const generateHeightMap = (): number[][] => {
  const heightMap: number[][] = [];
  
  // Define peaks (x, y, height, spread)
  const peaks = [
    // Global optimum - sharp peak
    { x: 35, y: 35, height: 1.2, spread: 3 },   // Global optimum (winner goes here)

    // Major local optima
    { x: 12, y: 42, height: 0.78, spread: 5 },  // Upper left
    { x: 42, y: 12, height: 0.72, spread: 5 },  // Lower right
    { x: 8, y: 12, height: 0.65, spread: 6 },   // Lower left corner
    { x: 44, y: 44, height: 0.68, spread: 4 },  // Upper right corner

    // Medium local optima
    { x: 25, y: 18, height: 0.58, spread: 4 },  // Center-bottom
    { x: 18, y: 28, height: 0.55, spread: 5 },  // Left-center
    { x: 38, y: 25, height: 0.52, spread: 4 },  // Right-center
    { x: 28, y: 42, height: 0.60, spread: 5 },  // Center-top

    // Minor local optima (traps)
    { x: 5, y: 30, height: 0.42, spread: 3 },   // Far left
    { x: 30, y: 5, height: 0.38, spread: 3 },   // Far bottom
    { x: 45, y: 30, height: 0.45, spread: 3 },  // Far right
    { x: 22, y: 35, height: 0.48, spread: 4 },  // Near global (deceptive)
    { x: 35, y: 22, height: 0.50, spread: 4 },  // Near global (deceptive)

    // Small bumps for texture
    { x: 15, y: 20, height: 0.35, spread: 3 },
    { x: 32, y: 8, height: 0.32, spread: 2 },
    { x: 8, y: 35, height: 0.30, spread: 3 },
    { x: 40, y: 38, height: 0.36, spread: 3 },
  ];
  
  let maxHeight = 0;

  // First pass: generate raw heights
  for (let i = 0; i < LANDSCAPE_SIZE; i++) {
    const row: number[] = [];
    for (let j = 0; j < LANDSCAPE_SIZE; j++) {
      let height = 0;

      // Sum contributions from all peaks
      for (const peak of peaks) {
        const dx = i - peak.x;
        const dy = j - peak.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const contribution = peak.height * Math.exp(-(distance * distance) / (2 * peak.spread * peak.spread));
        height += contribution;
      }

      // Add some noise for visual interest
      const noise = Math.sin(i * 0.3) * Math.cos(j * 0.3) * 0.03;
      height += noise;

      if (height > maxHeight) maxHeight = height;

      row.push(height);
    }
    heightMap.push(row);
  }

  // Second pass: normalize to [0, 1] to preserve smooth peaks
  for (let i = 0; i < LANDSCAPE_SIZE; i++) {
    for (let j = 0; j < LANDSCAPE_SIZE; j++) {
      heightMap[i][j] = heightMap[i][j] / maxHeight;
    }
  }

  return heightMap;
};

export const lossLandscape: LossLandscape = {
  width: LANDSCAPE_SIZE,
  height: LANDSCAPE_SIZE,
  heightMap: generateHeightMap(),
  optimalPosition: { x: 35, y: 35 }, // Location of global optimum
};

// Helper to get height at a specific position (with interpolation)
export const getHeightAt = (x: number, y: number): number => {
  const { heightMap, width, height } = lossLandscape;
  
  // Clamp coordinates
  const clampedX = Math.max(0, Math.min(width - 1, x));
  const clampedY = Math.max(0, Math.min(height - 1, y));
  
  // Bilinear interpolation
  const x0 = Math.floor(clampedX);
  const x1 = Math.min(x0 + 1, width - 1);
  const y0 = Math.floor(clampedY);
  const y1 = Math.min(y0 + 1, height - 1);
  
  const xFrac = clampedX - x0;
  const yFrac = clampedY - y0;
  
  const h00 = heightMap[x0][y0];
  const h10 = heightMap[x1][y0];
  const h01 = heightMap[x0][y1];
  const h11 = heightMap[x1][y1];
  
  const h0 = h00 * (1 - xFrac) + h10 * xFrac;
  const h1 = h01 * (1 - xFrac) + h11 * xFrac;
  
  return h0 * (1 - yFrac) + h1 * yFrac;
};

// Convert landscape coordinates to 3D world coordinates
export const landscapeToWorld = (x: number, y: number): { x: number; y: number; z: number } => {
  const worldX = (x / LANDSCAPE_SIZE - 0.5) * 10;
  const worldZ = (y / LANDSCAPE_SIZE - 0.5) * 10;
  const worldY = getHeightAt(x, y) * 3; // Scale height for visibility
  
  return { x: worldX, y: worldY, z: worldZ };
};
