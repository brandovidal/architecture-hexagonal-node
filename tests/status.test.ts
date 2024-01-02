// TODO: Add tests for the backoffice app
import 'reflect-metadata'

import { afterAll, beforeAll, describe, it } from 'vitest'

import request from 'supertest'
import { BackofficeBackendApp } from 'src/apps/backoffice/BackofficeBackendApp'

let _request: request.Test
let application: BackofficeBackendApp
let _response: request.Response

// FIXME: run test with Supertest
describe.skip('Backoffice tests', () => {
  it('I send a GET request to "status", the response status code should be 200', async () => {
    _request = await request(application.httpServer).get('/v1/status')
    _response = await _request.expect(200)
  })
})

beforeAll(async () => {
  application = new BackofficeBackendApp()
  await application.start()
})

afterAll(async () => {
  await application.stop()
})
