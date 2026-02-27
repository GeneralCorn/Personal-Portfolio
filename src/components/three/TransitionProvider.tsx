'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type SlabSide = 'photography' | 'personal';

interface SlabContextType {
  currentSide: SlabSide;
  navigateTo: (side: SlabSide, path: string) => void;
  isTransitioning: boolean;
}

const SlabContext = createContext<SlabContextType | null>(null);

export function useSlabContext() {
  const context = useContext(SlabContext);
  if (!context) throw new Error('useSlabContext must be used within TransitionProvider');
  return context;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [currentSide, setCurrentSide] = useState<SlabSide>('photography');
  const [isTransitioning] = useState(false);
  const router = useRouter();

  const navigateTo = useCallback((side: SlabSide, path: string) => {
    // Update current side and navigate directly (no overlay animation)
    if (side !== currentSide) {
      setCurrentSide(side);
    }
    router.push(path);
  }, [currentSide, router]);

  return (
    <SlabContext.Provider value={{ currentSide, navigateTo, isTransitioning }}>
      {children}
    </SlabContext.Provider>
  );
}
