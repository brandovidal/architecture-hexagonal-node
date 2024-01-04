import 'reflect-metadata'

import { BackofficeBackendApp } from './BackofficeBackendApp'

try {
  void new BackofficeBackendApp().start()
} catch (e) {
  console.log(e)
  process.exit(1)
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
  process.exit(1)
})
