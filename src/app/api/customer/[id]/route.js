import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { user_key: id },
    select: {
      first_name: true,
      last_name: true,
      email: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}
