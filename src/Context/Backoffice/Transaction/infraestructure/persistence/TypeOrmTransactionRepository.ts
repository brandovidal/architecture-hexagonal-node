import type { EntitySchema } from 'typeorm'

import { TransactionEntity } from './typeorm/TransactionEntity'

import type { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

import { TypeOrmRepository } from '../../../../Shared/infraestructure/persistence/typeorm/TypeOrmRepository'

import { injectable } from 'inversify'

@injectable()
export class TypeOrmTransactionRepository extends TypeOrmRepository<Transaction> implements TransactionRepository {
  public save (transaction: Transaction): Promise<void> {
    return this.persist(transaction)
  }

  public async searchAll (): Promise<Transaction[]> {
    const repository = await this.repository()
    const documents = await repository.find({ order: { createdAt: 'ASC' }, cache: true })
    return documents
  }

  public async update (transaction: Transaction): Promise<Transaction> {
    const repository = await this.repository()
    await repository.save(transaction)

    return transaction
  }

  public async delete (id: string): Promise<void> {
    const repository = await this.repository()
    await repository.delete(id)
  }

  protected entitySchema (): EntitySchema<Transaction> {
    return TransactionEntity
  }
}
