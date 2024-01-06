import { EntitySchema } from 'typeorm'

import { ValueObjectTransformer } from '../../../../../Shared/infraestructure/persistence/typeorm/ValueObjectTransformer'

import { Transaction } from '../../../domain/Transaction'
import { TransactionId } from '../../../domain/TransactionId'

export const TransactionEntity = new EntitySchema<Transaction>({
  name: 'Transaction',
  tableName: 'transactions',
  target: Transaction,
  columns: {
    _id: {
      type: String,
      objectId: true,
      generated: true
    },
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(TransactionId)
    },
    sellerDomain: {
      name: 'seller_domain',
      type: String
    },
    kind: {
      type: String,
      nullable: false
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
  },
  indices: []
})
