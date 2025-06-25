import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="backdrop-blur-3xl bg-white/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link className='text-2xl font-bold text-neutral-900"' href="/">
        Bio-Zap
        </Link>
        <Link className="text-blue-500 hover:underline" href="/dashboard">
          {' '}
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
