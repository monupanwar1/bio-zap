import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className=" flex flex-col items-center text-center relative p-40">
      <div className=" absolute z-10 w-48 h-48 bg-blue-500 opacity-30 rounded-full top-10 left-10 blur-3xl"></div>
      <div className=" absolute z-10 w-48 h-48 bg-purple-500 opacity-30 rounded-full bottom-50 right-10 blur-3xl"></div>

      <div className='flex flex-col space-y-2'>
        <h1 className="font-bold text-6xl mb-4 z-10">RandLink</h1>
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
