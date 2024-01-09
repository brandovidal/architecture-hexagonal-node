import { injectable } from 'inversify'

import type { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

import { MongoRepository } from '../../../../Shared/infraestructure/persistence/mongo/MongoRepository'

import { AppContextEnum } from '../../../../../apps/backoffice/AppContext'
import { TransactionId } from '../../domain/TransactionId'

// interface TransactionDocument {
//   id: string
//   seller_domain: string
//   kind: string
// }

@injectable()
export class MongoTransactionRepository extends MongoRepository<Transaction> implements TransactionRepository {
  constructor () {
    super(AppContextEnum.BACKOFFICE_TRANSACTION_CONTEXT)
  }

  public save (transaction: Transaction): Promise<void> {
    return this.persist(transaction)
  }

  public async searchAll (): Promise<Transaction[]> {
    const options = { order: { createdAt: 'ASC' } }
    return await this.searchByFilters(options)
  }

  public async update (transaction: Transaction): Promise<void> {
    const repository = await this.collection()

    const transactionFormatted = transaction.toPrimitives()
    const transactionData = {
      invoice_number: transactionFormatted.invoice_number,
      amount: transactionFormatted.amount,
      status: transactionFormatted.status,
      user_updated: transactionFormatted.user_updated,
      updated_at: transactionFormatted.updated_at
    }

    await repository.findOneAndUpdate({ id: transaction.id }, transactionData)
  }

  public async delete (id: string): Promise<void> {
    const repository = await this.collection()

    await repository.deleteOne({ id: new TransactionId(id) })
  }

  protected collectionName () {
    return 'transactions'
  }
}
