'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavLink {
  href: string;
  label: string;
}

const photographyLinks: NavLink[] = [
  { href: '/photography', label: 'Gallery' },
  { href: '/photography/about', label: 'About' },
  { href: '/photography/contact', label: 'Contact' },
];

const personalLinks: NavLink[] = [
  { href: '/personal', label: 'About' },
  { href: '/personal/projects', label: 'Projects' },
  { href: '/personal/resume', label: 'Resume' },
  { href: '/personal/contact', label: 'Contact' },
];

interface NavLinksProps {
  section: 'photography' | 'personal';
}

export function NavLinks({ section }: NavLinksProps) {
  const pathname = usePathname();
  const links = section === 'photography' ? photographyLinks : personalLinks;

  return (
    <nav className="flex items-center gap-1">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link key={link.href} href={link.href}>
            <motion.span
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {link.label}
            </motion.span>
          </Link>
        );
      })}
    </nav>
  );
}
