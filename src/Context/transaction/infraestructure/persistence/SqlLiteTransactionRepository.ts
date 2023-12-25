import { injectable } from 'inversify'

import type { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

import prisma from '../../../../../prisma'

@injectable()
export default class SqlLiteTransactionRepository implements TransactionRepository {
  public async findAll (): Promise<Transaction[]> {
    const data = await prisma.transaction.findMany()
    return data
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
