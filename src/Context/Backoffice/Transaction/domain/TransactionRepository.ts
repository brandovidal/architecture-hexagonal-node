import type { Transaction } from './Transaction'

export interface TransactionRepository {
  searchAll: () => Promise<Transaction[]>
  save: (transaction: Transaction) => Promise<void>
  update: (transaction: Transaction) => Promise<Transaction>
  delete: (id: string) => Promise<void>
}
