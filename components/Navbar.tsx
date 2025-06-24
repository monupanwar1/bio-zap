import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 right-0  bg-white/30 border-b border-white/40 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <h1 className="  text-xl font-bold text-neutral-900">RandLink</h1>
        <Link className="text-blue-500 hover:underline" href="#">
          {' '}
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
