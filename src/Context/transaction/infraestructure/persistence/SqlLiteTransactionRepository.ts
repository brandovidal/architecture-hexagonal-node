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
    await prisma.transaction.create({
      data: {
        id: transaction.id,
        sellerDomain: transaction.sellerDomain,
        kind: transaction.kind,
        invoiceNumber: transaction.invoiceNumber,
        amount: transaction.amount,
        total: transaction.total,
        status: transaction.status,
        userCreated: transaction.userCreated,
        userUpdated: transaction.userUpdated,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt
      }
    })
  }
}
