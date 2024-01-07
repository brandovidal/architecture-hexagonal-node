import { inject, injectable } from 'inversify'

import { Transaction } from '../domain/Transaction'
import { TransactionRepository } from '../domain/TransactionRepository'

import type { TransactionCreatorRequest } from './TransactionCreatorRequest'

import { TransactionId } from '../domain/TransactionId'

@injectable()
export default class TransactionCreator {
  constructor (@inject('Backoffice.Transaction.domain.TransactionRepository') private readonly repository: TransactionRepository) {}

  async run (request: TransactionCreatorRequest): Promise<void> {
    const id = request.id !== undefined ? new TransactionId(request.id) : TransactionId.random()
    const createdAt = request.created_at ?? new Date()
    const updatedAt = request.updated_at ?? new Date()

    const transaction = new Transaction(
      id,
      request.seller_domain,
      request.kind,
      request.invoice_number,
      request.amount,
      request.total,
      request.status,
      request.user_created,
      request.user_updated,
      createdAt,
      updatedAt
    )
    await this.repository.save(transaction)
  }
}
