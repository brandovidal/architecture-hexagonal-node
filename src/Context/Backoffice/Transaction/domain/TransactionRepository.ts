import type { Transaction } from './Transaction'

import type { Nullable } from '../../../../Context/Shared/domain/Nullable'

export interface TransactionRepository {
  searchById: (id: string) => Promise<Nullable<Transaction>>
  searchAll: () => Promise<Transaction[]>
  save: (transaction: Transaction) => Promise<void>
  update: (transaction: Transaction) => Promise<void>
  delete: (id: string) => Promise<void>
}
