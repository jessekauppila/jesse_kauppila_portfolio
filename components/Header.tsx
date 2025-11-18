'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { href: '/' as const, label: 'Work' },
  { href: '/about' as const, label: 'About' },
  { href: '/contact' as const, label: 'Contact' },
] as const;

export function Header() {
  const pathname = usePathname();
  return (
    <header className="py-6 flex items-center justify-between">
      <Link
        href="/"
        className="text-xl font-medium tracking-tight hover:opacity-80 transition"
      >
        Jesse Kauppila
      </Link>
      <nav className="flex gap-6 text-sm">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'hover:opacity-80 transition',
              pathname === href && 'underline'
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
