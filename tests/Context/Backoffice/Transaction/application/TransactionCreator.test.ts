import 'reflect-metadata'

import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'

import TransactionCreator from 'src/Context/Backoffice/Transaction/application/TransactionCreator'

import { TransactionRepositoryMock } from '../__mocks__/CourseRepositoryMock'
import { Uuid } from 'src/Context/Shared/domain/value-object/Uuid'

describe('TransactionCreator', () => {
  let repository: TransactionRepositoryMock

  beforeAll(() => {
    repository = new TransactionRepositoryMock()
  })

  it('should create a valid transaction', async () => {
    const creator = new TransactionCreator(repository)

    const id = new Uuid('95ecc380-afe9-11e4-9b6c-751b66dd541e')
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
      id,
      sellerDomain: seller_domain,
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

    await creator.run({ id: id.value, seller_domain, kind, invoice_number, amount, total, status, user_created, user_updated, created_at, updated_at })

    repository.assertSaveHasBeenCalledWith(expectedTransaction)
  })
})
