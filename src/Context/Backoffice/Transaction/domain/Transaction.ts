import type { Uuid } from '../../../Shared/domain/value-object/Uuid'
import type { ObjectId } from '../../../Shared/domain/value-object/ObjectId'

import type { TransactionId } from './TransactionId'
import type { TransactionSellerName } from './TransactionSellerName'

export class Transaction {
  _id!: ObjectId
  id!: TransactionId

  sellerDomain!: TransactionSellerName
  kind!: string

  invoiceNumber: number

  amount: number
  total: number

  status: string

  userCreated?: string
  userUpdated?: string

  createdAt?: Date
  updatedAt?: Date

  constructor ({
    id,
    sellerDomain,
    kind,
    invoiceNumber,
    amount,
    total,
    status,
    userCreated,
    userUpdated,
    createdAt,
    updatedAt
  }: {
    id: TransactionId
    sellerDomain: TransactionSellerName
    kind: string
    invoiceNumber: number
    amount: number
    total: number
    status: string
    userCreated?: string
    userUpdated?: string
    createdAt?: Date
    updatedAt?: Date
  }) {
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

  static fromPrimitives (plainData: {
    id: TransactionId
    seller_domain: TransactionSellerName
    kind: string
    invoice_number: number
    amount: number
    total: number
    status: string
    user_created?: string
    user_updated?: string
    created_at?: Date
    updated_at?: Date
  }): Transaction {
    return new Transaction({
      id: plainData.id,
      sellerDomain: plainData.seller_domain,
      kind: plainData.kind,
      invoiceNumber: plainData.invoice_number,
      amount: plainData.amount,
      total: plainData.total,
      status: plainData.status,
      userCreated: plainData.user_created,
      userUpdated: plainData.user_updated,
      createdAt: plainData.created_at,
      updatedAt: plainData.updated_at
    })
  }

  toPrimitives () {
    return {
      id: this.id.value,
      seller_domain: this.sellerDomain.value,
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
