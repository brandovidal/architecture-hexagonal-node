import 'reflect-metadata'

import { describe, expect, it, beforeAll } from 'vitest'

import { Transaction } from '../src/Context/transaction/domain/Transaction'
import type { TransactionRepository } from '../src/Context/transaction/domain/TransactionRepository'

import TransactionsFinder from '../src/Context/transaction/application/TransactionsFinder'
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
  let transactionsFinder: TransactionsFinder
  let transactionCreator: TransactionCreator

  beforeAll(() => {
    const repository = new MockTransactionRepository()

    transactionsFinder = new TransactionsFinder(repository)
    transactionCreator = new TransactionCreator(repository)
  })

  it('should get all transactions', async () => {
    const transactionListExpected = await transactionsFinder.run()
    expect(transactionListExpected.length).toEqual(0)
  })

  it('should save an transaction', async () => {
    const transaction = new Transaction(1, 'example.com', 'WALLET', 1, 100, 100, 'PENDING', 'admin', 'admin', new Date(), new Date())
    void transactionCreator.run('example.com', 'WALLET', 1, 100, 100, 'PENDING', 'admin', 'admin')

    const transactionListExpected = await transactionsFinder.run()
    expect(transactionListExpected.length).toEqual(1)

    const transactionExpected = transactionListExpected[0]
    expect(transactionExpected.sellerDomain).toBe(transaction.sellerDomain)
    expect(transactionExpected.amount).toBe(transaction.amount)
  })
})
