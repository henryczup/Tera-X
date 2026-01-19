'use client';

import { motion } from 'framer-motion';
import PixelPreview from './PixelPreview';
import { DesignCard as DesignCardType } from '@/types/antenna';

interface DesignCardProps {
  design: DesignCardType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

const SELECTED_COLOR = '#f97316'; // Orange theme
const UNSELECTED_COLOR = '#6b7280'; // Gray

export default function DesignCard({
  design,
  isSelected,
  onSelect,
  disabled = false,
}: DesignCardProps) {
  const color = isSelected ? SELECTED_COLOR : UNSELECTED_COLOR;

  return (
    <motion.button
      onClick={() => !disabled && onSelect(design.id)}
      disabled={disabled}
      className={`
        relative p-4 rounded-xl transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isSelected
          ? 'bg-opacity-30 scale-105'
          : 'bg-opacity-10 hover:bg-opacity-20 hover:scale-102'
        }
      `}
      style={{
        background: isSelected
          ? `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`
          : 'var(--card)',
        border: `2px solid ${isSelected ? color : 'var(--border)'}`,
        boxShadow: isSelected
          ? `0 0 30px ${color}40, inset 0 0 20px ${color}10`
          : 'none',
      }}
      whileHover={!disabled ? { y: -5 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: color }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      {/* Holographic shimmer effect */}
      {isSelected && (
        <div
          className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(
              135deg,
              transparent 0%,
              ${color}08 25%,
              transparent 50%,
              ${color}08 75%,
              transparent 100%
            )`,
            backgroundSize: '200% 200%',
            animation: 'shimmer 2s ease-in-out infinite',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <PixelPreview
          pixelGrid={design.pixelGrid}
          size="large"
          color={color}
        />

        <div className="text-center">
          <h3
            className="text-lg font-bold tracking-wide"
            style={{ color }}
          >
            {design.name}
          </h3>
        </div>
      </div>

      {/* Bottom accent line */}
      {isSelected && (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-300"
          style={{
            width: '60%',
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />
      )}
    </motion.button>
  );
}

// Add shimmer keyframes
const shimmerStyle = `
@keyframes shimmer {
  0% { background-position: 200% 200%; }
  100% { background-position: -200% -200%; }
}
`;

if (typeof document !== 'undefined') {
  const styleId = 'design-card-shimmer';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = shimmerStyle;
    document.head.appendChild(style);
  }
}
