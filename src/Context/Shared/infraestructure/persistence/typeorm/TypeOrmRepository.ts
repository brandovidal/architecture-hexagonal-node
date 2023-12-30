import type { EntitySchema, Repository } from 'typeorm'
import { injectable } from 'inversify'

import { AppContextEnum } from '../../../../../AppContex'

import type { AggregateRoot } from '../../../domain/AggregateRoot'
import { TypeOrmClientFactory } from './TypeOrmClientFactory'

@injectable()
export abstract class TypeOrmRepository<T extends AggregateRoot> {
  // private readonly _client: DataSource

  // constructor () {
  // constructor (@unmanaged() private _client: Promise<DataSource>) {
  // this._client = TypeOrmClientFactory.getClientOrFail(AppContextEnum.APP_CONTEXT)
  // }

  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  protected abstract entitySchema(): EntitySchema<T>

  // protected get client () {
  //   return this._client
  // }

  protected async repository (): Promise<Repository<T>> {
    const schema = this.entitySchema()

    const _client = TypeOrmClientFactory.getClientOrFail(AppContextEnum.APP_CONTEXT)
    return _client.getMongoRepository(schema)
  }

  protected async persist (aggregateRoot: T): Promise<void> {
    const repository = await this.repository()
    const docuemnt = aggregateRoot.toPrimitives()

    await repository.insert(docuemnt)
  }
}
