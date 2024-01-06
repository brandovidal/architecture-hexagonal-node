import 'reflect-metadata'

import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'

import { TransactionRepositoryMock } from '../__mocks__/CourseRepositoryMock'

import TransactionCreator from 'src/Context/Backoffice/Transaction/application/TransactionCreator'

import { TransactionId } from 'src/Context/Backoffice/Transaction/domain/TransactionId'
import { TransactionSellerName } from 'src/Context/Backoffice/Transaction/domain/TransactionSellerName'

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

    const expectedTransaction = new Transaction({
      id: new TransactionId(id),
      sellerDomain: new TransactionSellerName(seller_domain),
      kind,
      invoiceNumber: invoice_number,
      amount,
      total,
      status,
      userCreated: user_created,
      userUpdated: user_updated,
      createdAt: created_at,
      updatedAt: updated_at
    })

    await creator.run({ id: id, seller_domain, kind, invoice_number, amount, total, status, user_created, user_updated, created_at, updated_at })

    repository.assertSaveHasBeenCalledWith(expectedTransaction)
  })
})
