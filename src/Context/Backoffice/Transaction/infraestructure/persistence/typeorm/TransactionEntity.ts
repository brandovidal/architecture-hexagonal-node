import { EntitySchema, ObjectId } from 'typeorm'

import { Transaction } from '../../../domain/Transaction'

export const TransactionEntity = new EntitySchema<Transaction>({
  name: 'Transaction',
  tableName: 'transactions',
  target: Transaction,
  columns: {
    id: {
      type: String,
      primary: true,
      default: () => new ObjectId().toHexString()
    },
    sellerDomain: {
      name: 'seller_domain',
      type: String
    },
    kind: {
      type: String
    },
    invoiceNumber: {
      name: 'invoice_number',
      type: Number,
      nullable: true
    },
    amount: {
      type: Number
    },
    total: {
      type: Number,
      nullable: true
    },
    status: {
      type: String,
      nullable: true
    },
    userCreated: {
      name: 'user_created',
      type: String,
      nullable: true
    },
    userUpdated: {
      name: 'user_updated',
      type: String,
      nullable: true
    },
    createdAt: {
      name: 'created_at',
      type: Date,
      nullable: true,
      default: () => new Date()
    },
    updatedAt: {
      name: 'updated_at',
      type: Date,
      nullable: true
    }
  }
})
