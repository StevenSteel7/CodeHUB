'use client';

import { Code2 } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="z-10 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8" />
              <span className="font-bold text-xl">CodeHUB</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}