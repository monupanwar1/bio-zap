import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/db';

type Params = {
  params: { slug: string };
};

export default async function PublicPage({ params }: Params) {
  const card = await prisma.card.findUnique({
    where: { slug: params.slug },
    include: { links: true },
  });

  if (!card) return notFound();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 dark:bg-zinc-930 transition-colors">
      <div className="w-full max-w-md shadow-2xl border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 p-6 space-y-6">
        {/* Avatar + Title */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src={card.avatarUrl}
            width={96}
            height={96}
            alt="Avatar"
            className="rounded-full object-cover border-4 border-zinc-300 dark:border-zinc-700 w-24 h-24 shadow-md"
          />
          <h1 className="text-2xl font-semibold text-zinc-800 dark:text-white text-center">
            {card.title}
          </h1>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          {card.links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-3 border border-zinc-200 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
            >
              <Image
                src={`/${link.icon}.svg`}
                alt={`${link.label} icon`}
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="text-zinc-800 dark:text-zinc-100 font-medium text-base">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
