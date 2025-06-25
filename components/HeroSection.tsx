import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className=" flex flex-col items-center text-center  p-40">
      <div className="flex flex-col space-y-2">
        <h1 className="font-bold text-6xl mb-4 z-10 text-nowrap">Bio-Zap</h1>
        <p className=" text-lg z-10 text-gray-700 ">
          One bio link,endless destination
        </p>
        <Link
          className="bg-neutral-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          href="#"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
