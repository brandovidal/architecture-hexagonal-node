import { inject, injectable } from 'inversify'
import { Transaction } from '../domain/Transaction'
import { TransactionRepository } from '../domain/TransactionRepository'

@injectable()
export default class TransactionUpdator {
  constructor (@inject('Backoffice.Transaction.domain.TransactionRepository') private readonly repository: TransactionRepository) {}

  async run (id: string, seller_domain: string, kind: string, invoice_number: number, amount: number, total: number, status: string, user_created: string, user_updated: string) {
    const transaction = new Transaction(id, seller_domain, kind, invoice_number, amount, total, status, user_created, user_updated, undefined, new Date())
    await this.repository.update!(transaction)
  }
}
