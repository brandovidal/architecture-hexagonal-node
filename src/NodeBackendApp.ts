import { Server } from './server'

import container from './app/dependency-injection'

import { Config } from './Context/Shared/infraestructure/config'
import { TypeOrmClientFactory } from './Context/Shared/infraestructure/persistence/typeorm/TypeOrmClientFactory'
import { AppContextEnum } from './AppContex'

const config = new Config()

export class NodeBackendApp {
  server?: Server

  async start () {
    const port = config.port ?? '5000'
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
    const app = container.resolve(TypeOrmClientFactory)

    await app.createClient(AppContextEnum.APP_CONTEXT, {
      url: config.databaseUrl
    })
  }
}
