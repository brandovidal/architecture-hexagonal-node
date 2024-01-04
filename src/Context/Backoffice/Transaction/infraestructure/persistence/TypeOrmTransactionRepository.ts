import type { EntitySchema } from 'typeorm'
import { injectable } from 'inversify'

import { TransactionEntity } from './typeorm/TransactionEntity'
import { type MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions'

import type { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

import { TypeOrmRepository } from '../../../../Shared/infraestructure/persistence/typeorm/TypeOrmRepository'

import { AppContextEnum } from '../../../../../apps/backoffice/AppContext'

import type { Nullable } from '../../../../../Context/Shared/domain/Nullable'

@injectable()
export class TypeOrmTransactionRepository extends TypeOrmRepository<Transaction> implements TransactionRepository {
  constructor () {
    super(AppContextEnum.BACKOFFICE_TRANSACTION_CONTEXT)
  }

  public save (transaction: Transaction): Promise<void> {
    return this.persist(transaction)
  }

  public async searchById (id: string): Promise<Nullable<Transaction>> {
    const repository = await this.repository()
    const document = await repository.findOneBy({ id })
    return document
  }

  public async searchAll (): Promise<Transaction[]> {
    const options: MongoFindManyOptions = { order: { createdAt: 'ASC' }, cache: true }
    return await this.searchByFilters(options)
  }

  public async update (transaction: Transaction): Promise<void> {
    const repository = await this.repository()

    const transactionFormatted = transaction.toPrimitives()
    const transactionData = {
      invoice_number: transactionFormatted.invoice_number,
      amount: transactionFormatted.amount,
      status: transactionFormatted.status,
      user_updated: transactionFormatted.user_updated,
      updated_at: transactionFormatted.updated_at
    }

    await repository.findOneAndUpdate({ id: transaction.id }, { $set: transactionData })
  }

  public async delete (id: string): Promise<void> {
    const repository = await this.repository()
    const res = await repository.deleteOne({ id })
    console.log('🚀 ~ file: TypeOrmTransactionRepository.ts:47 ~ TypeOrmTransactionRepository ~ delete ~ res:', res)
  }

  protected entitySchema (): EntitySchema<Transaction> {
    return TransactionEntity
  }
}
