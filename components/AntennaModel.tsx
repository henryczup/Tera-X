'use client';

import { useState, useEffect } from 'react';

function generatePattern(seed: number): number[][] {
  let s = seed;
  const random = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };

  const size = 10;
  const grid: number[][] = Array(size).fill(null).map(() => Array(size).fill(0));

  // Randomly fill ~50-60% of cells
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (random() < 0.55) {
        grid[y][x] = 1;
      }
    }
  }

  // Make sure bottom center has pixels for feed connection
  grid[size - 1][4] = 1;
  grid[size - 1][5] = 1;

  // Add some random holes
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x] === 1 && random() < 0.15) {
        grid[y][x] = 0;
      }
    }
  }

  return grid;
}

export default function AntennaModel() {
  const [pattern, setPattern] = useState<number[][] | null>(null);

  useEffect(() => {
    const seed = Date.now() % 100000;
    setPattern(generatePattern(seed));
  }, []);

  const gridSize = 10;
  const cellSize = 12;
  const gridWidth = gridSize * cellSize;
  const gridHeight = gridSize * cellSize;
  const padding = 10;
  const feedHeight = 80;
  const boardWidth = gridWidth + padding * 2;
  const boardHeight = gridHeight + padding * 2 + feedHeight;

  if (!pattern) return <div style={{ width: 180, height: 280 }} />;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 180, height: 280 }}>
      {/* Glow effect */}
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255,170,60,0.4) 0%, transparent 65%)',
          filter: 'blur(15px)',
        }}
      />

      {/* PCB Board */}
      <div
        className="relative"
        style={{
          width: boardWidth,
          height: boardHeight,
          backgroundColor: '#0a5f0a',
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Pixel Grid - no gaps so adjacent pixels connect */}
        <div
          className="absolute"
          style={{
            top: padding,
            left: padding,
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
            gap: 0,
          }}
        >
          {pattern.flat().map((cell, i) => (
            <div
              key={i}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: cell ? '#daa520' : 'transparent',
                boxShadow: cell ? 'inset 0 0 1px rgba(0,0,0,0.3)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Feed Line */}
        <div
          style={{
            position: 'absolute',
            bottom: padding,
            left: '50%',
            transform: 'translateX(-50%)',
            width: cellSize,
            height: feedHeight,
            backgroundColor: '#daa520',
          }}
        />
      </div>
    </div>
  );
}
