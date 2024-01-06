import { inject, injectable } from 'inversify'

import { Transaction } from '../domain/Transaction'
import { TransactionRepository } from '../domain/TransactionRepository'

import type { TransactionCreatorRequest } from './TransactionCreatorRequest'

import { Uuid } from '../../../../Context/Shared/domain/value-object/Uuid'

@injectable()
export default class TransactionCreator {
  constructor (@inject('Backoffice.Transaction.domain.TransactionRepository') private readonly repository: TransactionRepository) {}

  async run (request: TransactionCreatorRequest): Promise<void> {
    const id = (request.id.length > 0) ? new Uuid(request.id) : Uuid.random()
    const createdAt = request.created_at ?? new Date()
    const updatedAt = request.updated_at ?? new Date()

    const transaction = new Transaction({
      id,
      sellerDomain: request.seller_domain,
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
