import { inject, injectable } from 'inversify'

import { Transaction } from '../domain/Transaction'
import { TransactionRepository } from '../domain/TransactionRepository'

import type { TransactionCreatorRequest } from './TransactionCreatorRequest'

import { TransactionId } from '../domain/TransactionId'
import { TransactionSellerName } from '../domain/TransactionSellerName'
import { TransactionKind } from '../domain/TransactionKind'
import { TransactionInvoiceNumber } from '../domain/TransactionInvoiceNumber'
import { TransactionAmount } from '../domain/TransactionAmount'
import { TransactionTotal } from '../domain/TransactionTotal'
import { TransactionStatus } from '../domain/TransactionStatus'
import { TransactionUserCreated } from '../domain/TransactionUserCreated'
import { TransactionUserUpdated } from '../domain/TransactionUserUpdated'
import { TransactionCreatedAt } from '../domain/TransactionCreatedAt'
import { TransactionUpdatedAt } from '../domain/TransactionUpdatedAt'

@injectable()
export default class TransactionCreator {
  constructor (@inject('Backoffice.Transaction.domain.TransactionRepository') private readonly repository: TransactionRepository) {}

  async run (request: TransactionCreatorRequest): Promise<void> {
    const id = request.id !== undefined ? new TransactionId(request.id) : TransactionId.random()
    // const createdAt = request.created_at ?? new Date()
    // const updatedAt = request.updated_at ?? new Date()

    const transaction = new Transaction(
      id,
      new TransactionSellerName(request.seller_domain),
      new TransactionKind(request.kind),
      new TransactionInvoiceNumber(request.invoice_number),
      new TransactionAmount(request.amount),
      new TransactionTotal(request.total),
      new TransactionStatus(request.status),
      new TransactionUserCreated(request.user_created),
      new TransactionUserUpdated(request.user_updated),
      new TransactionCreatedAt(request.created_at),
      new TransactionUpdatedAt(request.updated_at)
    )
    await this.repository.save(transaction)
  }
}
