import type { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

import { MongoRepository } from '../../../../Context/Shared/infraestructure/persistence/mongo/MongoRepository'

import { injectable } from 'inversify'

@injectable()
export class MongoTransactionRepository extends MongoRepository<Transaction> implements TransactionRepository {
  public save (transaction: Transaction): Promise<void> {
    return this.persist(String(transaction.id), transaction)
  }

  public async searchAll (): Promise<Transaction[]> {
    const documents = await this.search<Transaction>()
    return documents
  }

  protected collectionName (): string {
    return 'transactions'
  }
}
