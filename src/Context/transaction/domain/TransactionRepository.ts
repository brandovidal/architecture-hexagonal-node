import type { Transaction } from './Transaction'

export interface TransactionRepository {
  findAll: () => Promise<Transaction[]>
  save: (transaction: Transaction) => Promise<Transaction>
}
