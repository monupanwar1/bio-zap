'use server';

import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { nanoid } from 'nanoid';

export async function addCard(
  avatarUrl: string,
  links: { label: string; url: string; icon: string }[],
) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

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
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthroized');
  return await prisma.card.findMany({
    where: { userId },
    include: { links: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function removeUserCard(cardId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');
  return await prisma.card.delete({
    where: {
      id: cardId,
    },
  });
}
