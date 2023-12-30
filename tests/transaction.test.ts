import 'reflect-metadata'

import { describe, expect, it, beforeAll } from 'vitest'

import { Transaction } from '../src/Context/Backoffice/Transaction/domain/Transaction'
import type { TransactionRepository } from '../src/Context/Backoffice/Transaction/domain/TransactionRepository'

import TransactionsFinder from 'src/Context/Backoffice/Transaction/application/TransactionsFinder'
import TransactionCreator from 'src/Context/Backoffice/Transaction/application/TransactionCreator'
import TransactionUpdator from 'src/Context/Backoffice/Transaction/application/TransactionUpdator'
import TransactionDeletor from 'src/Context/Backoffice/Transaction/application/TransactionDeletor'

class MockTransactionRepository implements TransactionRepository {
  private readonly transactions: Transaction[] = []
  public async searchAll (): Promise<Transaction[]> {
    return this.transactions
  }

  public async save (data: Transaction) {
    this.transactions.push(data)
  }

  public async update (data: Transaction) {
    const index = this.transactions.findIndex((transaction) => transaction.id === data.id)
    this.transactions[index] = data
  }

  public async delete (id: string) {
    const index = this.transactions.findIndex((transaction) => transaction.id === id)
    this.transactions.splice(index, 1)
  }
}

describe('Transaction', () => {
  let transactionsFinder: TransactionsFinder
  let transactionCreator: TransactionCreator
  let transactionUpdator: TransactionUpdator
  let transactionDeletor: TransactionDeletor

  beforeAll(() => {
    const repository = new MockTransactionRepository()

    transactionsFinder = new TransactionsFinder(repository)
    transactionCreator = new TransactionCreator(repository)
    transactionUpdator = new TransactionUpdator(repository)
    transactionDeletor = new TransactionDeletor(repository)
  })

  it('should get all transactions', async () => {
    const transactionListExpected = await transactionsFinder.run()
    expect(transactionListExpected.length).toEqual(0)
  })

  it('should save an transaction', async () => {
    const transaction = new Transaction('1', 'example.com', 'WALLET', 1, 100, 100, 'PENDING', 'admin', 'admin', new Date(), new Date())
    void transactionCreator.run('example.com', 'WALLET', 1, 100, 100, 'PENDING', 'admin', 'admin')

    const transactionListExpected = await transactionsFinder.run()
    expect(transactionListExpected.length).toEqual(1)

    const transactionExpected = transactionListExpected[0]
    expect(transactionExpected.sellerDomain).toBe(transaction.sellerDomain)
    expect(transactionExpected.amount).toBe(transaction.amount)
  })

  it('should update an transaction', async () => {
    const transaction = new Transaction('1', 'example.com', 'WALLET', 1, 100, 100, 'PENDING', 'admin', 'admin', new Date(), new Date())
    void transactionUpdator.run('1', 'example.com', 'WALLET', 1, 100, 100, 'PENDING', 'admin', 'admin')

    const transactionListExpected = await transactionsFinder.run()
    expect(transactionListExpected.length).toEqual(1)

    const transactionExpected = transactionListExpected[0]
    expect(transactionExpected.sellerDomain).toBe(transaction.sellerDomain)
    expect(transactionExpected.amount).toBe(transaction.amount)
  })

  it('should delete an transaction', async () => {
    void transactionDeletor.run('1')
    const transactionListExpected = await transactionsFinder.run()
    expect(transactionListExpected.length).toEqual(0)
  })
})
