import 'reflect-metadata'

import request from 'supertest'

import { BackofficeBackendApp } from 'src/apps/backoffice/BackofficeBackendApp'

// import { startServer } from './server'

let application: BackofficeBackendApp

describe('Check the transaction api', () => {
  it('I send a GET request to /v1/transactions, it should return 200', async () => {
    const response = await request(application.httpServer).get('/v1/transactions')
    console.log("🚀 ~ file: transaction.test.ts:14 ~ it ~ response:", response.status, response.body)

    expect(response.statusCode).toEqual(200)
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(response.body.success).toEqual(true)
  })

  it('I send a POST request to /v1/transaction, it should return 201', async () => {
    const response = await request(application.httpServer).post('/v1/transaction').send({
      seller_domain: 'test.com',
      kind: 'WALLET',
      invoice_number: 8,
      amount: 10,
      status: 'PENDING',
      user_created: 'test',
      user_updated: 'test'
    })

    expect(response.statusCode).toEqual(201)
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(response.body.success).toEqual(true)
  })

  it('I send a DELETE request to /v1/transaction, it should return 200', async () => {
    const response = await request(application.httpServer).get('/v1/transactions')

    const transactions = response.body.data

    expect(response.statusCode).toEqual(200)
    expect(transactions.length).toBeGreaterThan(0)

    const transactionId = transactions[0].id

    await request(application.httpServer).delete(`/v1/transaction/${transactionId}`).send({
      id: transactionId
    })
  })
})

beforeAll(async () => {
  application = new BackofficeBackendApp()
  await application.start()
})

afterAll(async () => {
  await application?.stop()
})
