import { Server } from './server'
import { Config } from './Context/Shared/infraestructure/config'
import { MongoClientFactory } from './Context/Shared/infraestructure/persistence/mongo/MongoClientFactory'

export class NodeBackendApp {
  server?: Server

  async start () {
    const config = new Config()

    await MongoClientFactory.createClient('Shared', { url: String(config.databaseUrl) })

    const port = config.port ?? '5000'
    this.server = new Server(port)

    await this.server.listen()
  }

  get httpServer () {
    return this.server?.getHTTPServer()
  }

  async stop () {
    await this.server?.stop()
  }
}
