import { Server } from './server'

import container from './dependency-injection'

import { Config } from '../../Context/Shared/infraestructure/config'
import { AppContextEnum } from './AppContext'

// import { TypeOrmClientFactory } from '../../Context/Shared/infraestructure/persistence/typeorm/TypeOrmClientFactory'
import { MongoClientFactory } from '../../Context/Shared/infraestructure/persistence/mongo/MongoClientFactory'

const config = new Config()

export class BackofficeBackendApp {
  server!: Server

  async start () {
    const port = config.port
    this.server = new Server(port)

    await this.startDatabaseConnection()

    await this.server.listen()
  }

  get httpServer () {
    return this.server?.getHTTPServer()
  }

  async stop () {
    await this.server?.stop()
  }

  private async startDatabaseConnection () {
    const app = container.resolve(MongoClientFactory)

    await app.createClient(AppContextEnum.BACKOFFICE_TRANSACTION_CONTEXT, {
      url: config.databaseUrl
    })
  }
}
