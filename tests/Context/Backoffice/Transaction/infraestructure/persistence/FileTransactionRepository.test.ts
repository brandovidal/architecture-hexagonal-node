import { FileTransactionRepository } from 'src/Context/Backoffice/Transaction/infraestructure/persistence/FileTransactionRepository'

import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'

import { TransactionId } from 'src/Context/Backoffice/Transaction/domain/TransactionId'
import { TransactionSellerDomain } from 'src/Context/Backoffice/Transaction/domain/TransactionSellerDomain'
import { TransactionKind } from 'src/Context/Backoffice/Transaction/domain/TransactionKind'
import { TransactionInvoiceNumber } from 'src/Context/Backoffice/Transaction/domain/TransactionInvoiceNumber'
import { TransactionAmount } from 'src/Context/Backoffice/Transaction/domain/TransactionAmount'
import { TransactionTotal } from 'src/Context/Backoffice/Transaction/domain/TransactionTotal'
import { TransactionStatus } from 'src/Context/Backoffice/Transaction/domain/TransactionStatus'
import { TransactionUserCreated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserCreated'
import { TransactionUserUpdated } from 'src/Context/Backoffice/Transaction/domain/TransactionUserUpdated'

const id = TransactionId.random()

describe('Save Transaction', () => {
  it('should save a transaction', async () => {
    const repository = new FileTransactionRepository()
    const expectedTransaction = new Transaction(
      id,
      new TransactionSellerDomain('example.com'),
      new TransactionKind('WALLET'),
      new TransactionInvoiceNumber(1),
      new TransactionAmount(100),
      new TransactionTotal(100),
      new TransactionStatus('PENDING'),
      new TransactionUserCreated('admin'),
      new TransactionUserUpdated('admin'),
    )

    await repository.save(expectedTransaction)
  })
})

afterAll(async () => {
  const repository = new FileTransactionRepository()
  await repository.delete(id.value)
})
