import { inject, injectable } from 'inversify'
import SqlLiteTransactionRepository from '../infraestructure/persistence/SqlLiteTransactionRepository'
import { Transaction } from '../domain/Transaction'

@injectable()
export default class TransactionCreator {
  constructor (@inject('SqlLiteTransactionRepository') private readonly repository: SqlLiteTransactionRepository) {}

  async run (seller_domain: string, kind: string, invoice_number: number, amount: number, total: number, status: string, user_created: string, user_updated: string) {
    const transaction = Transaction.create(seller_domain, kind, invoice_number, amount, total, status, user_created, user_updated)
    await this.repository.save(transaction)
  }
}
