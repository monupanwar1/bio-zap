import { LayoutGrid, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="flex flex-col items-center text-center p-20 dark:bg-zinc-950 transition-colors duration-300 min-h-screen">
      <section>
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold lg:text-6xl text-5xl mb-4 z-10 text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-xl z-10 text-gray-700 dark:text-gray-300">
            Manage your bio card with ease here
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 p-6 mt-12 w-full max-w-5xl">
        <Link href="/dashboard/new">
          <div className="p-10 md:p-16 bg-white/30 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg hover:scale-[1.02] transform transition-all duration-300 cursor-pointer text-left ring-1 ring-inset ring-white/20 dark:ring-white/10">
            <div className="flex items-center gap-4 mb-4">
              <PlusCircle className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Add New Card
              </h2>
            </div>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              Add a new card with your links
            </p>
          </div>
        </Link>

        <Link href="/dashboard/cards">
          <div className="p-10 md:p-16 bg-white/30 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg hover:scale-[1.02] transform transition-all duration-300 cursor-pointer text-left ring-1 ring-inset ring-white/20 dark:ring-white/10">
            <div className="flex items-center gap-4 mb-4">
              <LayoutGrid className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                View My Cards
              </h2>
            </div>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              Edit or delete your existing card
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}
