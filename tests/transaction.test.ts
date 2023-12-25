import 'reflect-metadata'

import { describe, expect, it, beforeAll } from 'vitest'

import TransactionReader from '../src/Context/transaction/application/TransactionReader'
import type { TransactionRepository } from '../src/Context/transaction/domain/TransactionRepository'

import { Transaction } from '../src/Context/transaction/domain/Transaction'
import TransactionCreator from '../src/Context/transaction/application/TransactionCreator'

class MockTransactionRepository implements TransactionRepository {
  private readonly transactions: Transaction[] = []
  public async searchAll (): Promise<Transaction[]> {
    return this.transactions
  }

  public async save (data: Transaction) {
    this.transactions.push(data)
  }
}

describe('Transaction', () => {
  let transactionReader: TransactionReader
  let transactionCreator: TransactionCreator

  beforeAll(() => {
    const repository = new MockTransactionRepository()

    transactionReader = new TransactionReader(repository)
    transactionCreator = new TransactionCreator(repository)
  })

  it('should get all transactions', async () => {
    const transactionListExpected = await transactionReader.run()
    expect(transactionListExpected.length).toEqual(0)
  })

  it('should save an transaction', async () => {
    const transaction = new Transaction(1, 'example.com', 'WALLET', 1, 100, 100, 'PENDING', 'admin', 'admin', new Date(), new Date())
    void transactionCreator.run(1, 'example.com', 'WALLET', 1, 100, 100, 'PENDING', 'admin', 'admin', new Date(), new Date())

    const transactionListExpected = await transactionReader.run()
    expect(transactionListExpected.length).toEqual(1)

    const transactionExpected = transactionListExpected[0]
    expect(transactionExpected.sellerDomain).toBe(transaction.sellerDomain)
    expect(transactionExpected.amount).toBe(transaction.amount)
  })
})
