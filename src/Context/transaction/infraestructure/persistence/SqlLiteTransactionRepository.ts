import { injectable } from 'inversify'

import { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

import prisma from '../../../../../prisma'

@injectable()
export default class SqlLiteTransactionRepository implements TransactionRepository {
  public async searchAll (): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany()
    return transactions.map(transaction => Transaction.fromPrimitives(transaction))
  }

  public async save (transaction: Transaction): Promise<void> {
    const data = transaction.toPrimitives()
    await prisma.transaction.create({ data })
  }
}
