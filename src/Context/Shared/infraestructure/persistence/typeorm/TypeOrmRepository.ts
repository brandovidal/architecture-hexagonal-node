import type { DataSource, EntitySchema, Repository } from 'typeorm'
import { injectable, unmanaged } from 'inversify'

import type { AggregateRoot } from '../../../domain/AggregateRoot'
import { AppContextEnum } from '../../../../../AppContex'
import { TypeOrmClientFactory } from './TypeOrmClientFactory'

@injectable()
export abstract class TypeOrmRepository<T extends AggregateRoot> {
  // private readonly _client?: Promise<DataSource>

  // constructor () {}
  constructor (@unmanaged() private readonly _client: Promise<DataSource>) {}

  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  protected abstract entitySchema(): EntitySchema<T>

  protected client (): Promise<DataSource> {
    return this._client
  }

  protected async repository (): Promise<Repository<T>> {
    const client = TypeOrmClientFactory.getClientOrFail(AppContextEnum.APP_CONTEXT)

    // this._client = client
    const schema = this.entitySchema()
    return client.getRepository(schema)
  }

  protected async persist (aggregateRoot: T): Promise<void> {
    const repository = await this.repository()

    const data = aggregateRoot.toPrimitives()
    console.log('🚀 ~ file: TypeOrmRepository.ts:33 ~ TypeOrmRepository<T ~ persist ~ data:', data)
    // await repository.save(data)

    // upsert
    await repository.upsert(aggregateRoot, ['id'])
  }
}
