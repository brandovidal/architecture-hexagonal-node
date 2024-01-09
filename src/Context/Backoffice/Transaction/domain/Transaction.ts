import { type ObjectId } from '../../../Shared/domain/value-object/ObjectId'

import { type TransactionId } from './TransactionId'
import { type TransactionInvoiceNumber } from './TransactionInvoiceNumber'
import { type TransactionKind } from './TransactionKind'
import { type TransactionSellerDomain } from './TransactionSellerDomain'
import { type TransactionStatus } from './TransactionStatus'
import { type TransactionAmount } from './TransactionAmount'
import { type TransactionTotal } from './TransactionTotal'
import { type TransactionUserCreated } from './TransactionUserCreated'
import { type TransactionUserUpdated } from './TransactionUserUpdated'
import { type TransactionCreatedAt } from './TransactionCreatedAt'
import { type TransactionUpdatedAt } from './TransactionUpdatedAt'

export class Transaction {
  _id!: ObjectId
  id!: TransactionId

  sellerDomain!: TransactionSellerDomain
  kind!: TransactionKind

  invoiceNumber: TransactionInvoiceNumber

  amount!: TransactionAmount
  total: TransactionTotal

  status: TransactionStatus

  userCreated?: TransactionUserCreated
  userUpdated?: TransactionUserUpdated

  createdAt?: TransactionCreatedAt
  updatedAt?: TransactionUpdatedAt

  // TODO: implement Maybe Pattern
  constructor (
    id: TransactionId,
    sellerDomain: TransactionSellerDomain,
    kind: TransactionKind,
    invoiceNumber: TransactionInvoiceNumber,
    amount: TransactionAmount,
    total: TransactionTotal,
    status: TransactionStatus,
    userCreated?: TransactionUserCreated,
    userUpdated?: TransactionUserUpdated,
    createdAt?: TransactionCreatedAt,
    updatedAt?: TransactionUpdatedAt
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
      seller_domain: this.sellerDomain.value,
      kind: this.kind.value,
      invoice_number: this.invoiceNumber.value,
      amount: this.amount.value,
      total: this.total.value,
      status: this.status?.value,
      user_created: this.userCreated?.value,
      user_updated: this.userUpdated?.value,
      created_at: this.createdAt?.value,
      updated_at: this.updatedAt?.value
    }
  }
}
