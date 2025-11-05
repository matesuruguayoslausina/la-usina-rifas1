import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(){
  const title = 'Rifa Demo – Combo Matero'
  const slug = 'rifa-demo'
  const exists = await prisma.raffle.findUnique({ where: { slug } })
  if(exists) return NextResponse.json({ ok:true, slug })

  const raffle = await prisma.raffle.create({
    data: { title, slug, priceCents: 350000, totalNumbers: 100, status: 'ACTIVE' }
  })
  const tickets = Array.from({length: 100}).map((_,i)=>({ raffleId: raffle.id, number: i+1 }))
  for (let i=0;i<tickets.length;i+=100){
    await prisma.ticket.createMany({ data: tickets.slice(i, i+100), skipDuplicates: true })
  }
  return NextResponse.json({ ok:true, slug })
}
