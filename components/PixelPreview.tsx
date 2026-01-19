'use client';

import { motion } from 'framer-motion';

// PCB realistic colors
const FR4_GREEN = '#0a5f0a';
const COPPER_GOLD = '#daa520';

interface PixelPreviewProps {
  pixelGrid: number[][];
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  label?: string;
  color?: string; // Only used for label now
  className?: string;
}

export default function PixelPreview({
  pixelGrid,
  size = 'medium',
  showLabel = false,
  label = '',
  color = '#f97316',
  className = '',
}: PixelPreviewProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className={`${sizeClasses[size]} relative rounded-lg overflow-hidden`}
        style={{
          backgroundColor: FR4_GREEN,
          boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Pixel grid - no gaps for connected look */}
        <div className="absolute inset-1 grid grid-cols-10 grid-rows-10">
          {pixelGrid.flat().map((cell, index) => (
            <div
              key={index}
              style={{
                backgroundColor: cell === 1 ? COPPER_GOLD : 'transparent',
                boxShadow: cell === 1 ? 'inset 0 0 1px rgba(0,0,0,0.3)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Feed strip indicator (bottom center) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[10%] h-[20%]"
          style={{ backgroundColor: COPPER_GOLD }}
        />
      </div>

      {showLabel && label && (
        <span
          className="text-xs font-mono font-bold tracking-wider"
          style={{ color }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

// Floating tooltip version for hover preview
interface PixelTooltipProps {
  pixelGrid: number[][];
  designName: string;
  fitness: number;
  resonance: number;
  color: string;
  position: { x: number; y: number };
}

export function PixelTooltip({
  pixelGrid,
  designName,
  fitness,
  resonance,
  color,
  position,
}: PixelTooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%) translateY(-10px)',
      }}
    >
      <div className="p-3 flex flex-col items-center gap-2 border border-border rounded-xl bg-card/95 backdrop-blur-sm">
        <PixelPreview pixelGrid={pixelGrid} size="small" color={color} />
        <div className="text-center">
          <div className="font-bold text-sm" style={{ color }}>
            {designName}
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            Fitness: {(fitness * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {resonance.toFixed(2)} GHz
          </div>
        </div>
      </div>
    </motion.div>
  );
}
