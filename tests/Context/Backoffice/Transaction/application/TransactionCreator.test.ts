import 'reflect-metadata'

import TransactionCreator from 'src/Context/Backoffice/Transaction/application/TransactionCreator'

import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'
import { TransactionRepository } from 'src/Context/Backoffice/Transaction/domain/TransactionRepository'

describe('TransactionCreator', () => {
  it('should create a valid transaction', async () => {
    const transaction = new Transaction('1', 'example.com', 'WALLET', 1, 100, 100, 'PENDING', 'admin', 'admin', new Date(), new Date())
    expect(transaction).toBeInstanceOf(Transaction)

    const repository: TransactionRepository = {
      save: vi.fn(),
      // searchAll: vi.fn(),
      // update: vi.fn(),
      // delete: vi.fn()
    }

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

    expect(repository.save).toHaveBeenCalledWith(expectedTransaction)
  })
})
