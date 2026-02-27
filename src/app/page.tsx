'use client';

import { useSlabContext } from '@/components/three/TransitionProvider';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { ParticleField } from '@/components/three/ParticleField';

export default function Home() {
  const { navigateTo, isTransitioning } = useSlabContext();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-foreground relative">
      <ParticleField density="low" variant="ink" />
      {/* Theme toggle - top right */}
      <div className="absolute top-6 right-6">
        <ThemeSwitch />
      </div>

      <h1 className="text-5xl font-bold mb-8">Welcome</h1>
      <p className="text-xl mb-12 text-muted-foreground">Choose your experience</p>

      <div className="flex gap-6">
        <button
          onClick={() => navigateTo('photography', '/photography')}
          disabled={isTransitioning}
          className="px-8 py-4 border border-foreground/20 text-foreground rounded-lg hover:scale-105 hover:border-foreground/40 transition-all disabled:opacity-50"
        >
          Visuals
        </button>
        <button
          onClick={() => navigateTo('personal', '/personal')}
          disabled={isTransitioning}
          className="px-8 py-4 border border-foreground/20 text-foreground rounded-lg hover:scale-105 hover:border-foreground/40 transition-all disabled:opacity-50"
        >
          Projects
        </button>
      </div>
    </div>
  );
}
