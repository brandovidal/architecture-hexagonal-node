/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { Filter, Collection, FindOptions } from 'mongodb'
import { type AggregateRoot } from '../../../domain/AggregateRoot'

import { injectable, unmanaged } from 'inversify'

import { MongoClientFactory } from './MongoClientFactory'

@injectable()
export abstract class MongoRepository<T extends AggregateRoot> {
  context: string

  constructor (@unmanaged() readonly _context: string) {
    this.context = _context
  }
  protected abstract collectionName(): string

  protected get client () {
    return MongoClientFactory.getClientOrFail(this.context)
  }

  protected async collection (): Promise<Collection<T>> {
    const schema = this.collectionName()
    return this.client.collection(schema)
  }

  protected async persist (aggregateRoot: T): Promise<void> {
    const collection = await this.collection()

    // const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined }
    const document = { ...aggregateRoot.toPrimitives() }

    await collection.insertOne(document)
    // await collection.updateOne({ _id: id }, { $set: document }, { upsert: true })
  }

  protected async searchByFilters (filter: Filter<T> = {}, options?: FindOptions<T>) {
    const collection = await this.collection()
    const documents = collection.find(filter, options).toArray() as unknown as T[]
    console.log('🚀 ~ file: MongoRepository.ts:40 ~ MongoRepository<T ~ searchByFilters ~ documents:', documents)
    return documents
  }
}
