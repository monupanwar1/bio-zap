
'use server';

import prisma from '@/lib/db';
import { nanoid } from 'nanoid';
import { auth } from '@clerk/nextjs/server';

export async function addCard(
  avatarUrl: string,
  links: { label: string; url: string; icon: string }[],
) {
  const {userId} =await auth() 
  if(!userId){
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
  const {userId}=await auth();
  if(!userId) throw new Error("Unauthroized")
  return await prisma.card.findMany({
    where:{userId},
    include: { links: true },
    orderBy: { createdAt: 'desc' },
  });
}
