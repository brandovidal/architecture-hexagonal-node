import { inject, injectable } from 'inversify'
import SqlLiteTransactionRepository from '../infraestructure/persistence/SqlLiteTransactionRepository'
import { Transaction } from '../domain/Transaction'

@injectable()
export default class TransactionCreator {
  constructor (@inject('SqlLiteTransactionRepository') private readonly repository: SqlLiteTransactionRepository) {}

  async run (
    id: number,
    sellerDomain: string,
    kind: string,
    invoiceNumber: number,
    amount: number,
    total: number,
    status: string,
    userCreated: string,
    userUpdated: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    const transaction = new Transaction(id, sellerDomain, kind, invoiceNumber, amount, total, status, userCreated, userUpdated, createdAt, updatedAt)
    return await this.repository.save(transaction)
  }
}
