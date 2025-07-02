'use client';

import { SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="bg-white dark:bg-zinc-950 border-b border-gray-300 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          className="text-2xl font-bold text-neutral-900 dark:text-white"
          href="/"
        >
          Bio-Zap
        </Link>

        {/* Right Side */}
        <div className="gap-4 flex items-center">
          {user && (
            <Link
              className="text-blue-500 dark:text-blue-400 hover:underline"
              href="/dashboard"
            >
              Dashboard
            </Link>
          )}

          <ModeToggle />

          {user ? (
            <SignOutButton>
              <button className="text-sm font-medium text-red-500 dark:text-red-400 hover:underline">
                Log out
              </button>
            </SignOutButton>
          ) : (
            <Link
              href="/sign-in"
              className="text-sm font-medium text-blue-500 dark:text-blue-400 hover:underline"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
