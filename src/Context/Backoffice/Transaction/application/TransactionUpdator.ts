import { inject, injectable } from 'inversify'
import { Transaction } from '../domain/Transaction'
import { TransactionRepository } from '../domain/TransactionRepository'
import { Uuid } from '../../../../Context/Shared/domain/value-object/Uuid'

@injectable()
export default class TransactionUpdator {
  constructor (@inject('Backoffice.Transaction.domain.TransactionRepository') private readonly repository: TransactionRepository) {}

  async run (id: string, seller_domain: string, kind: string, invoice_number: number, amount: number, total: number, status: string, user_created: string, user_updated: string) {
    const transaction = new Transaction({ id: new Uuid(id), sellerDomain: seller_domain, kind, invoiceNumber: invoice_number, amount, total, status, userCreated: user_created, userUpdated: user_updated })
    await this.repository.update!(transaction)
  }
}
