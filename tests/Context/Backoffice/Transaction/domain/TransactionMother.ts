import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'
import { TransactionCreatorRequest } from 'src/Context/Backoffice/Transaction/application/TransactionCreatorRequest'

import { TransactionId } from 'src/Context/Backoffice/Transaction/domain/TransactionId'
import { TransactionAmount } from 'src/Context/Backoffice/Transaction/domain/TransactionAmount'
import { TransactionCreatedAt } from 'src/Context/Backoffice/Transaction/domain/TransactionCreatedAt'
import { TransactionInvoiceNumber } from 'src/Context/Backoffice/Transaction/domain/TransactionInvoiceNumber'
import { TransactionKind } from 'src/Context/Backoffice/Transaction/domain/TransactionKind'
import { TransactionSellerDomain } from 'src/Context/Backoffice/Transaction/domain/TransactionSellerDomain'
import { TransactionStatus } from 'src/Context/Backoffice/Transaction/domain/TransactionStatus'
import { TransactionTotal } from 'src/Context/Backoffice/Transaction/domain/TransactionTotal'
import { TransactionUpdatedAt } from 'src/Context/Backoffice/Transaction/domain/TransactionUpdatedAt'
import { TransactionUserCreated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserCreated'
import { TransactionUserUpdated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserUpdated'

import { TransactionIdMother } from './TransactionIdMother'
import { TransactionSellerDomainMother } from './TransactionSellerDomainMother'
import { TransactionKindMother } from './TransactionKindMother'
import { TransactionInvoiceNumberMother } from './TransactionInvoiceNumberMother'
import { TransactionAmountMother } from './TransactionAmountMother'
import { TransactionTotalMother } from './TransactionTotalMother'
import { TransactionStatusMother } from './TransactionStatusMother'
import { TransactionUserCreatedMother } from './TransactionUserCreatedMother'
import { TransactionUserUpdatedMother } from './TransactionUserUpdatedMother'
import { TransactionCreatedAtMother } from './TransactionCreatedAtMother'
import { TransactionUpdatedAtMother } from './TransactionUpdatedAtMother'

export class TransactionMother {
  static create (
    id: TransactionId,
    sellerDomain: TransactionSellerDomain,
    kind: TransactionKind,
    invoiceNumber: TransactionInvoiceNumber,
    amount: TransactionAmount,
    total: TransactionTotal,
    status: TransactionStatus,
    userCreated: TransactionUserCreated,
    userUpdated: TransactionUserUpdated,
    createdAt?: TransactionCreatedAt,
    updatedAt?: TransactionUpdatedAt
  ) {
    return new Transaction(id, sellerDomain, kind, invoiceNumber, amount, total, status, userCreated, userUpdated, createdAt, updatedAt)
  }

  static fromRequest (request: TransactionCreatorRequest): Transaction {
    return this.create(
      new TransactionId(request.id),
      new TransactionSellerDomain(request.seller_domain),
      new TransactionKind(request.kind),
      new TransactionInvoiceNumber(request.invoice_number),
      new TransactionAmount(request.amount),
      new TransactionTotal(request.total),
      new TransactionStatus(request.status),
      new TransactionUserCreated(request.user_created),
      new TransactionUserUpdated(request.user_updated),
      new TransactionCreatedAt(request.created_at),
      new TransactionUpdatedAt(request.updated_at)
    )
  }

  static random (): Transaction {
    return this.create(
      TransactionIdMother.random(),
      TransactionSellerDomainMother.random(),
      TransactionKindMother.random(),
      TransactionInvoiceNumberMother.random(),
      TransactionAmountMother.random(),
      TransactionTotalMother.random(),
      TransactionStatusMother.random(),
      TransactionUserCreatedMother.random(),
      TransactionUserUpdatedMother.random(),
      TransactionCreatedAtMother.random(),
      TransactionUpdatedAtMother.random()
    )
  }
}
