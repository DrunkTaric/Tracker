import prisma from "@/services/prisma";
import { NextResponse } from 'next/server';

function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export async function GET(request: Request) {
  try {
    await prisma.$connect()
    let uuid = generateRandomString(40)
    while ((await prisma.session.findMany({ where: { sessionId: uuid } })).length > 0) {
      uuid = generateRandomString(40)
    }
    await prisma.session.create({ data: { sessionId: uuid } })
    await prisma.$disconnect();
    return NextResponse.json({ error: false, session: uuid })
  } catch (_) {
    return NextResponse.json({ error: true, session: undefined })
  }
}
