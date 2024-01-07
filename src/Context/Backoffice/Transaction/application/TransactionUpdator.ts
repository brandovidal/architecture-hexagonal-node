import { inject, injectable } from 'inversify'

import { Transaction } from '../domain/Transaction'
import { TransactionRepository } from '../domain/TransactionRepository'

import { TransactionId } from '../domain/TransactionId'
import { TransactionSellerDomain } from '../domain/TransactionSellerDomain'
import { TransactionKind } from '../domain/TransactionKind'
import { TransactionInvoiceNumber } from '../domain/TransactionInvoiceNumber'
import { TransactionAmount } from '../domain/TransactionAmount'
import { TransactionTotal } from '../domain/TransactionTotal'
import { TransactionStatus } from '../domain/TransactionStatus'
import { TransactionUserCreated } from '../domain/TransactionUserCreated'
import { TransactionUserUpdated } from '../domain/TransactionUserUpdated'
import { TransactionUpdatedAt } from '../domain/TransactionUpdatedAt'

@injectable()
export default class TransactionUpdator {
  constructor (@inject('Backoffice.Transaction.domain.TransactionRepository') private readonly repository: TransactionRepository) {}

  async run (id: string, seller_domain: string, kind: string, invoice_number: number, amount: number, total: number, status: string, user_created: string, user_updated: string) {
    const transaction = new Transaction(
      new TransactionId(id),
      new TransactionSellerDomain(seller_domain),
      new TransactionKind(kind),
      new TransactionInvoiceNumber(invoice_number),
      new TransactionAmount(amount),
      new TransactionTotal(total),
      new TransactionStatus(status),
      new TransactionUserCreated(user_created),
      new TransactionUserUpdated(user_updated),
      undefined,
      new TransactionUpdatedAt()
    )
    await this.repository.update!(transaction)
  }
}
