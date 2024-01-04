import 'reflect-metadata'

import request from 'supertest'

import { BackofficeBackendApp } from 'src/apps/backoffice/BackofficeBackendApp'

import { startServer } from './server'

let application: BackofficeBackendApp

describe('Check the api status', () => {
  it('I send a GET request to /v1/status, it should return 200', async () => {
    const res = await request(application.httpServer).get('/v1/status')

    expect(res.statusCode).toEqual(200)
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
  })
})

beforeAll(async () => {
  application = await startServer()
})

afterAll(async () => {
  await application.stop()
})
