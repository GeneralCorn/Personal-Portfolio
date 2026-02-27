'use client';

import { HomeButton } from './HomeButton';
import { SectionSwitch } from './SectionSwitch';
import { NavLinks } from './NavLinks';
import { ThemeSwitch } from '@/components/ThemeSwitch';

interface NavbarProps {
  section: 'photography' | 'personal';
}

export function Navbar({ section }: NavbarProps) {
  return (
    <nav className="p-4 border-b border-border flex items-center justify-between gap-4">
      {/* Left side: Home + Section Switch */}
      <div className="flex items-center gap-3">
        <HomeButton />
        <div className="w-px h-6 bg-border" />
        <SectionSwitch currentSection={section} />
      </div>

      {/* Right side: Nav Links + Theme */}
      <div className="flex items-center gap-4">
        <NavLinks section={section} />
        <div className="w-px h-6 bg-border" />
        <ThemeSwitch />
      </div>
    </nav>
  );
}
