import 'reflect-metadata'

import { BackofficeBackendApp } from 'src/apps/backoffice/BackofficeBackendApp'

export async function startServer () {
  const application = new BackofficeBackendApp()

  if (!application.httpServer) {
    console.log('Application not started')
    await application.start()
  }

  return application
}
