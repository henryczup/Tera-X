import { SParameterCurve } from '@/types/antenna';

// Generate S-parameter curves for antenna simulation
// The resonance dip shifts from ~4.9 GHz toward ~3.5 GHz as optimization progresses

const FREQ_POINTS = 100;
const FREQ_MIN = 1.5; // GHz
const FREQ_MAX = 5.5; // GHz

// Generate frequency array
export const frequencyArray: number[] = Array.from(
  { length: FREQ_POINTS },
  (_, i) => FREQ_MIN + (i / (FREQ_POINTS - 1)) * (FREQ_MAX - FREQ_MIN)
);

// Seeded random for consistent curves
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Generate an S11 curve with a resonance dip at a specific frequency
export const generateS11Curve = (
  resonanceFreq: number,
  dipDepth: number = -25, // dB at resonance
  bandwidth: number = 0.15, // GHz
  seed: number = 0 // For unique random variations per design
): SParameterCurve => {
  // Generate secondary resonances based on seed
  const numSecondary = 2 + Math.floor(seededRandom(seed * 7) * 3); // 2-4 secondary dips
  const secondaryDips = Array.from({ length: numSecondary }, (_, i) => ({
    freq: 1.8 + seededRandom(seed * 13 + i * 17) * 3.2, // Random freq between 1.8-5.0 GHz
    depth: -6 - seededRandom(seed * 19 + i * 23) * 8, // -6 to -14 dB
    bw: 0.15 + seededRandom(seed * 29 + i * 31) * 0.2, // 0.15-0.35 GHz bandwidth
  }));

  const s11: number[] = frequencyArray.map((freq, idx) => {
    // Varying baseline (slight slope and subtle variation)
    const baselineSlope = (freq - 3.5) * 0.2;
    const baselineNoise = Math.sin(freq * 4.7 + seed) * 0.3;
    const baseline = -3 + baselineSlope + baselineNoise;

    // Main resonance dip (Lorentzian shape for more realistic look)
    const delta = freq - resonanceFreq;
    const lorentzian = 1 / (1 + (delta / (bandwidth * 0.5)) ** 2);
    const mainDip = (dipDepth - baseline) * lorentzian;

    // Secondary resonances
    let secondaryTotal = 0;
    for (const sec of secondaryDips) {
      const secDelta = freq - sec.freq;
      const secLorentz = 1 / (1 + (secDelta / (sec.bw * 0.5)) ** 2);
      secondaryTotal += (sec.depth - baseline) * secLorentz * 0.5;
    }

    // Subtle ripple pattern
    const ripple1 = Math.sin(freq * 12 + seed * 3) * 0.2;
    const ripple2 = Math.sin(freq * 23 + seed * 5) * 0.1;

    // Minimal noise
    const noise = (seededRandom(seed * 100 + idx) - 0.5) * 0.3;

    let value = baseline + mainDip + secondaryTotal + ripple1 + ripple2 + noise;

    // Clamp to realistic range
    return Math.max(-35, Math.min(-1, value));
  });

  return {
    frequency: [...frequencyArray],
    s11,
  };
};

// Generate S-parameter curve based on fitness (0-1) and design seed
// Higher fitness = resonance closer to target 3.5 GHz
export const generateS11ForFitness = (fitness: number, designSeed: number = 0): SParameterCurve => {
  // Map fitness to resonance frequency
  // fitness 0 -> ~4.9 GHz (starting point)
  // fitness 1 -> ~3.5 GHz (target)
  const startFreq = 4.9;
  const targetFreq = 3.5;
  const resonanceFreq = startFreq - fitness * (startFreq - targetFreq);

  // Better fitness = deeper dip (better matching)
  const dipDepth = -15 - fitness * 15; // -15 to -30 dB

  // Better fitness = narrower bandwidth (more selective)
  const bandwidth = 0.25 - fitness * 0.1; // 0.25 to 0.15 GHz

  // Seed based on design + fitness for consistent but evolving curves
  const seed = designSeed + Math.floor(fitness * 10);

  return generateS11Curve(resonanceFreq, dipDepth, bandwidth, seed);
};

// Get resonance frequency from fitness
export const getResonanceFromFitness = (fitness: number): number => {
  const startFreq = 4.9;
  const targetFreq = 3.5;
  return startFreq - fitness * (startFreq - targetFreq);
};
