import type { Collection, MongoClient, Document } from 'mongodb'
import { ObjectId } from 'mongodb'
import type { AggregateRoot } from '../../../domain/AggregateRoot'

export abstract class MongoRepository<T extends AggregateRoot> {
  constructor (private readonly _client: Promise<MongoClient>) {}

  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  protected abstract collectionName(): string

  protected client (): Promise<MongoClient> {
    return this._client
  }

  protected async collection (): Promise<Collection> {
    return (await this._client).db().collection(this.collectionName())
  }

  protected async search<D extends Document> () {
    const collection = await this.collection()

    return await collection.find<D>({}).toArray()
  }

  protected async persist (id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection()

    const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined }

    const objectId = new ObjectId(id)

    await collection.updateOne({ _id: objectId }, { $set: document }, { upsert: true })
  }
}
