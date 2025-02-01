'use server';

import { auth } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';

export async function getAvailableCredits() {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unautheticated');
  }

  const balance = await prisma.userBalanace.findUnique({
    where: { userId },
  });

  if (!balance) return 10000;

  return balance.credits;
}
