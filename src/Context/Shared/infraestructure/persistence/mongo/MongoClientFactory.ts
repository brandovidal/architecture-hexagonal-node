import { MongoClient } from 'mongodb'
import type MongoConfig from './MongoConfig'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MongoClientFactory {
  private static clients: Record<string, MongoClient> = {}

  static async createClient (contextName: string, config: MongoConfig): Promise<MongoClient> {
    let client = MongoClientFactory.getClient(contextName)

    if (client === null) {
      client = await MongoClientFactory.createAndConnectClient(config)

      MongoClientFactory.registerClient(client, contextName)
    }

    return client
  }

  private static getClient (contextName: string): MongoClient | null {
    return MongoClientFactory.clients[contextName]
  }

  private static async createAndConnectClient (config: MongoConfig): Promise<MongoClient> {
    const client = new MongoClient(config.url, { ignoreUndefined: true })

    await client.connect()

    return client
  }

  private static registerClient (client: MongoClient, contextName: string): void {
    MongoClientFactory.clients[contextName] = client
  }
}
