import { PrismaClient } from '../prisma'
import type { Prisma } from '../prisma'

const prisma = new PrismaClient()

async function main () {
  const data: Prisma.TransactionCreateInput = {
    seller_domain: 'example.com',
    kind: 'WALLET',
    amount: 100.00,
    status: 'PENDING'
  }

  const transaction = await prisma.transaction.create({ data })
  console.log({ transaction })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
