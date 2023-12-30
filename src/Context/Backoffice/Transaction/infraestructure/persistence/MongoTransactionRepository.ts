import type { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

import { MongoRepository } from '../../../../Shared/infraestructure/persistence/mongo/MongoRepository'

import { injectable } from 'inversify'

@injectable()
export default class MongoTransactionRepository extends MongoRepository<Transaction> implements TransactionRepository {
  public save (transaction: Transaction): Promise<void> {
    return this.persist(String(transaction.id), transaction)
  }

  public async searchAll (): Promise<Transaction[]> {
    const documents = await this.search<Transaction>()
    return documents
  }

  public update (transaction: Transaction): Promise<void> {
    return this.persist(String(transaction.id), transaction)
  }

  public async delete (id: string): Promise<void> {
    const repository = await this.collection()
    await repository.deleteOne({ id })
  }

  protected collectionName (): string {
    return 'transactions'
  }
}
