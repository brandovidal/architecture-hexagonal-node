import { inject, injectable } from 'inversify'

import { Transaction } from '../domain/Transaction'
import { TransactionRepository } from '../domain/TransactionRepository'

import type { TransactionCreatorRequest } from './TransactionCreatorRequest'

import { TransactionId } from '../domain/TransactionId'
import { TransactionSellerName } from '../domain/TransactionSellerName'

@injectable()
export default class TransactionCreator {
  constructor (@inject('Backoffice.Transaction.domain.TransactionRepository') private readonly repository: TransactionRepository) {}

  async run (request: TransactionCreatorRequest): Promise<void> {
    const id = (request.id.length > 0) ? new TransactionId(request.id) : TransactionId.random()
    const createdAt = request.created_at ?? new Date()
    const updatedAt = request.updated_at ?? new Date()

    const transaction = new Transaction({
      id: id,
      sellerDomain: new TransactionSellerName(request.seller_domain),
      kind: request.kind,
      invoiceNumber: request.invoice_number,
      amount: request.amount,
      total: request.total,
      status: request.status,
      userCreated: request.user_created,
      userUpdated: request.user_updated,
      createdAt,
      updatedAt
    })
    await this.repository.save(transaction)
  }
}
