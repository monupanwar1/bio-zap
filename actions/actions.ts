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

  const name = await getUserName();
  const slug = nanoid(8);

  return await prisma.card.create({
    data: {
      title: `${name} Card`,
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

export async function editCard(
  slug: string,
  avatarUrl: string,
  links: { label: string; url: string; icon: string }[],
  title?: string,
) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  if (!slug) throw new Error('Slug is required');

  const existingCard = await prisma.card.findUnique({
    where: { slug }, // ✅ query by slug now
  });

  if (!existingCard || existingCard.userId !== userId) {
    throw new Error('Not allowed to edit this card');
  }

  await prisma.link.deleteMany({
    where: { cardId: existingCard.id },
  });

  return await prisma.card.update({
    where: { slug }, // ✅ update by slug
    data: {
      avatarUrl,
      title: title || existingCard.title,
      links: {
        create: links,
      },
    },
    include: {
      links: true,
    },
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

export async function getCardBySlug(slug: string) {
  return await prisma.card.findUnique({
    where: { slug },
    include: { links: true },
  });
}
