import { type ObjectId } from '../../../Shared/domain/value-object/ObjectId'

import type { TransactionId } from './TransactionId'

export class Transaction {
  _id!: ObjectId
  id!: TransactionId

  sellerDomain!: string
  kind!: string

  invoiceNumber: number

  amount: number
  total: number

  status: string

  userCreated?: string
  userUpdated?: string

  createdAt?: Date
  updatedAt?: Date

  constructor (
    id: TransactionId,
    sellerDomain: string,
    kind: string,
    invoiceNumber: number,
    amount: number,
    total: number,
    status: string,
    userCreated?: string,
    userUpdated?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id
    this.sellerDomain = sellerDomain
    this.kind = kind
    this.invoiceNumber = invoiceNumber
    this.amount = amount
    this.total = total
    this.status = status
    this.userCreated = userCreated
    this.userUpdated = userUpdated
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  toPrimitives () {
    return {
      id: this.id.value,
      seller_domain: this.sellerDomain,
      kind: this.kind,
      invoice_number: this.invoiceNumber,
      amount: this.amount,
      total: this.total,
      status: this.status,
      user_created: this.userCreated,
      user_updated: this.userUpdated,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
  }
}
