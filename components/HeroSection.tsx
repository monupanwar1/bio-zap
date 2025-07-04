import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center p-40 dark:bg-zinc-950 transition-colors duration-300">
      <div className="flex flex-col space-y-2">
        <h1 className="font-bold text-6xl mb-4 z-10 text-nowrap text-gray-900 dark:text-white">
          Bio-Zap
        </h1>
        <p className="text-lg z-10 text-gray-700 dark:text-gray-300">
          One bio link, endless destination
        </p>
        <Link
          className="bg-neutral-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition"
          href="/create-card"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
