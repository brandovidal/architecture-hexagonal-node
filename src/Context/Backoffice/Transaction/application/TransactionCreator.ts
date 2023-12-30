import { inject, injectable } from 'inversify'

import { Transaction } from '../domain/Transaction'
import { TransactionRepository } from '../domain/TransactionRepository'
import { ObjectId } from '../../../../Context/Shared/domain/ObjectId'

@injectable()
export default class TransactionCreator {
  constructor (@inject('TransactionRepository') private readonly repository: TransactionRepository) {}

  async run (seller_domain: string, kind: string, invoice_number: number, amount: number, total: number, status: string, user_created: string, user_updated: string) {
    const id = ObjectId.random()
    const transaction = Transaction.create(id, seller_domain, kind, invoice_number, amount, total, status, user_created, user_updated)
    await this.repository.save(transaction)
  }
}