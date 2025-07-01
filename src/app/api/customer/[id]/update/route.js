import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  const { id } = await params;
  console.log("Customer backend id :", id)
  const data = await req.json();

  try {
    await prisma.user.update({
      where: {user_key:id },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
