import 'reflect-metadata'

import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'

import TransactionCreator from 'src/Context/Backoffice/Transaction/application/TransactionCreator'

import { TransactionRepositoryMock } from '../__mocks__/CourseRepositoryMock'

describe('TransactionCreator', () => {
  let repository: TransactionRepositoryMock

  beforeAll(() => {
    repository = new TransactionRepositoryMock()
  })

  it('should create a valid transaction', async () => {
    const creator = new TransactionCreator(repository)

    const id = "id"
    const sellerDomain = "example.com"
    const kind = "WALLET"
    const invoiceNumber = 1
    const amount = 100
    const total = 100
    const status = "PENDING"
    const userCreated = "admin"
    const userUpdated = "admin"
    const createdAt = new Date()
    const updatedAt = new Date()
    const expectedTransaction = new Transaction(id, sellerDomain, kind, invoiceNumber, amount, total, status, userCreated, userUpdated, createdAt, updatedAt)

    await creator.run(id, sellerDomain, kind, invoiceNumber, amount, total, status, userCreated, userUpdated, createdAt, updatedAt)

    repository.assertSaveHasBeenCalledWith(expectedTransaction)
  })
})
