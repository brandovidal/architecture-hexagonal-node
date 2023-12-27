import { injectable } from 'inversify'

import { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

import prisma, { type Prisma } from '../../../../../../prisma'

@injectable()
export default class PrismaTransactionRepository implements TransactionRepository {
  public async searchAll (): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany()
    return transactions.map(transaction => Transaction.fromPrimitives(transaction))
  }

  public async save (transaction: Transaction): Promise<void> {
    const data: Prisma.TransactionCreateInput = transaction.toPrimitives()

    await prisma.transaction.create({ data })
  }

  public async update (transaction: Transaction): Promise<Transaction> {
    const transactionData = transaction.toPrimitives()
    delete transactionData.id

    const data: Prisma.TransactionUpdateInput = transactionData

    const transactionUpdated = await prisma.transaction.update({
      where: { id: transaction.id },
      data,
      select: {
        id: true,
        seller_domain: true,
        kind: true,
        invoice_number: true,
        amount: true,
        total: true,
        status: true,
        user_created: true,
        user_updated: true,
        created_at: true,
        updated_at: true
      }
    })

    return Transaction.fromPrimitives(transactionUpdated)
  }

  public async delete (id: string): Promise<void> {
    await prisma.transaction.delete({ where: { id } })
  }
}
