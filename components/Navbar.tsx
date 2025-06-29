import Link from 'next/link';
import { ModeToggle } from './ModeToggle';

export default function Navbar() {
  return (
    <nav className=" bg-white dark:bg-zinc-950 border-b border-gray-300 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link
          className="text-2xl font-bold text-neutral-900 dark:text-white"
          href="/"
        >
          Bio-Zap
        </Link>
        <div className='gap-4 flex items-center justify-center'>
          <Link
            className="text-blue-500 dark:text-blue-400 hover:underline"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
