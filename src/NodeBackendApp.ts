import { Config } from './config'
import { Server } from './server'

export class NodeBackendApp {
  server?: Server

  async start () {
    const config = new Config()

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
