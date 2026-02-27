'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks';

// Types
type ParticleShape = 'splitCircle' | 'splitSquare' | 'hexagon';
type Density = 'low' | 'medium' | 'high';

interface Particle {
  id: string;
  shape: ParticleShape;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color1: string;
  color2: string;
  driftDuration: number;
  driftDelay: number;
  rotationDuration: number;
}

interface ParticleFieldProps {
  density?: Density;
  variant?: 'ink';
  enabled?: boolean;
  className?: string;
}

// Constants
const DENSITY_MAP: Record<Density, number> = {
  low: 18,
  medium: 24,
  high: 30,
};

const INK_COLORS = [
  'var(--particle-ink-light)',
  'var(--particle-ink-mid)',
  'var(--particle-ink-dark)',
];

const INK_WEIGHTS = [0.4, 0.35, 0.25];

// Utility functions
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function weightedRandom<T>(items: T[], weights: number[]): T {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }
  return items[items.length - 1];
}

// Shape components - two-tone variants
function SplitCircle({ size, color1, color2 }: { size: number; color1: string; color2: string }) {
  return (
    <div
      className="rounded-full overflow-hidden"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color1} 50%, ${color2} 50%)`,
      }}
    />
  );
}

function SplitSquare({ size, color1, color2 }: { size: number; color1: string; color2: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color1} 50%, ${color2} 50%)`,
      }}
    />
  );
}

function Hexagon({ id, size, color1, color2 }: { id: string; size: number; color1: string; color2: string }) {
  const gradientId = `hex-grad-${id}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="50%" stopColor={color1} />
          <stop offset="50%" stopColor={color2} />
        </linearGradient>
      </defs>
      <polygon
        points="50,3 93,25 93,75 50,97 7,75 7,25"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

// Framer Motion variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0, 0, 0.2, 1], // easeOut equivalent
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 1, 1] }, // easeIn equivalent
  },
};

const particleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Shape options for variety
const SHAPES: ParticleShape[] = ['splitCircle', 'splitSquare', 'hexagon'];

// Generate particles (client-side only to avoid hydration mismatch)
function generateParticles(density: Density): Particle[] {
  const count = DENSITY_MAP[density];

  return Array.from({ length: count }, (_, i) => {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    // Pick two different colors for two-tone effect
    const color1 = weightedRandom(INK_COLORS, INK_WEIGHTS);
    let color2 = weightedRandom(INK_COLORS, INK_WEIGHTS);
    // Ensure colors are different for contrast
    if (color1 === color2) {
      const idx = INK_COLORS.indexOf(color1);
      color2 = INK_COLORS[(idx + 1) % INK_COLORS.length];
    }

    return {
      id: `particle-${i}`,
      shape,
      x: randomInRange(5, 95),
      y: randomInRange(5, 95),
      size: randomInRange(6, 14),
      opacity: randomInRange(0.15, 0.5),
      color1,
      color2,
      // Faster movement: 8-20s instead of 20-50s
      driftDuration: randomInRange(8, 20),
      driftDelay: randomInRange(0, 5),
      rotationDuration: randomInRange(15, 40),
    };
  });
}

// Main component
export function ParticleField({
  density = 'low',
  variant = 'ink',
  enabled = true,
  className,
}: ParticleFieldProps) {
  const prefersReducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles only on client mount (avoids hydration mismatch)
  useEffect(() => {
    setParticles(generateParticles(density));
  }, [density]);

  // Don't render during SSR or if disabled
  if (prefersReducedMotion || !enabled || particles.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {enabled && (
        <motion.div
          className={cn(
            'particle-field fixed inset-0 z-0 overflow-hidden pointer-events-none',
            className
          )}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-hidden="true"
        >
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              data-particle
              className="absolute"
              variants={particleVariants}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
            >
              {/* Outer wrapper: Framer controls entrance opacity/scale */}
              {/* Inner wrapper: CSS controls drift transform */}
              <div
                style={{
                  opacity: particle.opacity,
                  animation: `particle-drift ${particle.driftDuration}s ease-in-out infinite`,
                  animationDelay: `${particle.driftDelay}s`,
                }}
              >
                {/* Rotation wrapper */}
                <div
                  style={{
                    animation: `particle-rotate ${particle.rotationDuration}s linear infinite`,
                  }}
                >
                  {particle.shape === 'splitCircle' && (
                    <SplitCircle size={particle.size} color1={particle.color1} color2={particle.color2} />
                  )}
                  {particle.shape === 'splitSquare' && (
                    <SplitSquare size={particle.size} color1={particle.color1} color2={particle.color2} />
                  )}
                  {particle.shape === 'hexagon' && (
                    <Hexagon id={particle.id} size={particle.size} color1={particle.color1} color2={particle.color2} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
