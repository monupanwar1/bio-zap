// lib/serverActions/cardController.ts
'use server';

import prisma from '@/lib/db';
import { nanoid } from 'nanoid';

export async function addCard(
  avatarUrl: string,
  links: { label: string; url: string; icon: string }[],
) {
  const userId = 'dev-user'; // skip Clerk

  const slug = nanoid(8);

  return await prisma.card.create({
    data: {
      title: 'My Card',
      avatarUrl,
      userId,
      slug,
      links: {
        create: links,
      },
    },
  });
}

export async function getUserCard() {
  return await prisma.card.findMany({
    include: { links: true },
    orderBy: { createdAt: 'desc' },
  });
}
