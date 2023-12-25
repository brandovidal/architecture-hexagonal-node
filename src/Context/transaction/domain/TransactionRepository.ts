import type { Transaction } from './Transaction'

export interface TransactionRepository {
  searchAll: () => Promise<Transaction[]>
  save: (transaction: Transaction) => Promise<void>
}
