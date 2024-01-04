import 'reflect-metadata'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import request from 'supertest'

import { BackofficeBackendApp } from 'src/apps/backoffice/BackofficeBackendApp'

let application: BackofficeBackendApp

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(application.httpServer).get('/v1/status')

    expect(res.statusCode).toEqual(200)
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
  })
})

beforeAll(async () => {
  application = new BackofficeBackendApp()
  await application.start()
})

afterAll(async () => {
  await application.stop()
})
