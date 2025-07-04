'use server';

import prisma from '@/lib/db';

import { clerkClient } from '@clerk/clerk-sdk-node';
import { auth } from '@clerk/nextjs/server';
import { nanoid } from 'nanoid';

export async function getUserName() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }
  const user = await clerkClient.users.getUser(userId);
  const name = user.firstName || user.username || 'My Card';
  return name;
}

export async function addCard(
  avatarUrl: string,
  links: { label: string; url: string; icon: string }[],
) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  // 🔥 Fetch user from Clerk
  
 const name = await getUserName();

  const slug = nanoid(8);

  return await prisma.card.create({
    data: {
      title: `${name} Card`, // 👈 Use Clerk's name here
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
