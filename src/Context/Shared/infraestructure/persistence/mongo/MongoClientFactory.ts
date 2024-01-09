import { type Db, MongoClient } from 'mongodb'
import type MongoConfig from './MongoConfig'

import { injectable } from 'inversify'

@injectable()
export class MongoClientFactory {
  private static readonly clients: Record<string, Db> = {}

  async createClient (contextName: string, config: MongoConfig, dbName?: string): Promise<Db> {
    let client = MongoClientFactory.getClient(contextName)

    if (client !== undefined || client !== null) {
      client = await MongoClientFactory.createAndConnectClient(contextName, config, dbName)
      MongoClientFactory.registerClient(client, contextName)
    }
    console.log(`MongoDB client registered in context "${contextName}".`)

    return client
  }

  private static async createAndConnectClient (contextName: string, config: MongoConfig, dbName?: string): Promise<Db> {
    try {
      const client = new MongoClient(config.url, { appName: contextName })

      await client.connect()
      console.log('MongoDB connected.')

      return client.db(dbName)
    } catch (err) {
      console.error('[Mongo DB connection]', err)
      throw new Error('MongoDB connection failed.')
    }
  }

  private static getClient (contextName: string): Db | null {
    return MongoClientFactory.clients[contextName]
  }

  static getClientOrFail (contextName: string): Db {
    const client = MongoClientFactory.clients[contextName]
    if (client === undefined) {
      throw new Error(`BD client for context <${contextName}> was not registered.`)
    }

    return client
  }

  private static registerClient (client: Db, contextName: string): void {
    MongoClientFactory.clients[contextName] = client
  }
}
