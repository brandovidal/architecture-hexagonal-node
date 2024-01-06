import { inject, injectable } from 'inversify'

import { Transaction } from '../domain/Transaction'
import { TransactionRepository } from '../domain/TransactionRepository'

import { ObjectId } from '../../../../Context/Shared/domain/ObjectId'

import { TransactionCreatorRequest } from './TransactionCreatorRequest'

@injectable()
export default class TransactionCreator {
  constructor (@inject('Backoffice.Transaction.domain.TransactionRepository') private readonly repository: TransactionRepository) {}

  async run (request: TransactionCreatorRequest): Promise<void> {
    const id = request.id ?? ObjectId.random()
    const createdAt = request.createdAt ?? new Date()
    const updatedAt = request.updatedAt ?? new Date()

    const transaction = new Transaction(id, request.sellerDomain, request.kind, request.invoiceNumber, request.amount, request.total, request.status, request.userCreated, request.userUpdated, createdAt, updatedAt)
    await this.repository.save(transaction)
  }
}
