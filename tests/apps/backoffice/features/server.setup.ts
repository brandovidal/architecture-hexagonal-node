import 'reflect-metadata'

import { BackofficeBackendApp } from 'src/apps/backoffice/BackofficeBackendApp'

let application: BackofficeBackendApp

export async function startServer () {
  application = new BackofficeBackendApp()

  if (!application.httpServer) {
    console.log('Application not started')
    await application.start()
  }

  return application
}

// beforeAll(async () => {
//   await startServer()
// })

// afterAll(async () => {
//   await application.stop()
// })
