'use client';

import { useSlabContext } from '@/components/three/TransitionProvider';
import { motion } from 'framer-motion';

interface SectionSwitchProps {
  currentSection: 'photography' | 'personal';
}

export function SectionSwitch({ currentSection }: SectionSwitchProps) {
  const { navigateTo, isTransitioning } = useSlabContext();

  const isPhotography = currentSection === 'photography';
  const targetSection = isPhotography ? 'personal' : 'photography';
  const targetPath = isPhotography ? '/personal' : '/photography';

  return (
    <motion.button
      onClick={() => navigateTo(targetSection, targetPath)}
      disabled={isTransitioning}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors disabled:opacity-50"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Switch to ${targetSection} section`}
    >
      {/* Current section indicator */}
      <span className="text-sm font-medium text-foreground">
        {isPhotography ? 'Photo' : 'Dev'}
      </span>

      {/* Arrow icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted-foreground"
      >
        <path d="M8 3 4 7l4 4" />
        <path d="M4 7h16" />
        <path d="m16 21 4-4-4-4" />
        <path d="M20 17H4" />
      </svg>

      {/* Target section */}
      <span className="text-sm text-muted-foreground">
        {isPhotography ? 'Dev' : 'Photo'}
      </span>
    </motion.button>
  );
}
