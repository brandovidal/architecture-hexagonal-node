import 'reflect-metadata'

import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'

import { TransactionRepositoryMock } from '../__mocks__/CourseRepositoryMock'

import TransactionCreator from 'src/Context/Backoffice/Transaction/application/TransactionCreator'

import { TransactionId } from 'src/Context/Backoffice/Transaction/domain/TransactionId'
import { TransactionSellerName } from 'src/Context/Backoffice/Transaction/domain/TransactionSellerName'
import { TransactionKind } from 'src/Context/Backoffice/Transaction/domain/TransactionKind'
import { TransactionInvoiceNumber } from 'src/Context/Backoffice/Transaction/domain/TransactionInvoiceNumber'
import { TransactionAmount } from 'src/Context/Backoffice/Transaction/domain/TransactionAmount'
import { TransactionTotal } from 'src/Context/Backoffice/Transaction/domain/TransactionTotal'
import { TransactionStatus } from 'src/Context/Backoffice/Transaction/domain/TransactionStatus'
import { TransactionUserCreated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserCreated'
import { TransactionUserUpdated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserUpdated'
import { TransactionCreatedAt } from 'src/Context/Backoffice/Transaction/domain/TransactionCreatedAt'
import { TransactionUpdatedAt } from 'src/Context/Backoffice/Transaction/domain/TransactionUpdatedAt'

describe('TransactionCreator', () => {
  let repository: TransactionRepositoryMock

  beforeAll(() => {
    repository = new TransactionRepositoryMock()
  })

  it('should create a valid transaction', async () => {
    const creator = new TransactionCreator(repository)

    const id = '95ecc380-afe9-11e4-9b6c-751b66dd541e'
    const seller_domain = 'example.com'
    const kind = 'WALLET'
    const invoice_number = 1
    const amount = 100
    const total = 100
    const status = 'PENDING'
    const user_created = 'admin'
    const user_updated = 'admin'
    const created_at = new Date()
    const updated_at = new Date()

    const expectedTransaction = new Transaction(
      new TransactionId(id),
      new TransactionSellerName(seller_domain),
      new TransactionKind(kind),
      new TransactionInvoiceNumber(invoice_number),
      new TransactionAmount(amount),
      new TransactionTotal(total),
      new TransactionStatus(status),
      new TransactionUserCreated(user_created),
      new TransactionUserUpdated(user_updated),
      new TransactionCreatedAt(created_at),
      new TransactionUpdatedAt(updated_at)
    )

    await creator.run({ id, seller_domain, kind, invoice_number, amount, total, status, user_created, user_updated, created_at, updated_at })

    repository.assertSaveHasBeenCalledWith(expectedTransaction)
  })
})
