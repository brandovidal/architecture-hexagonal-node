import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'
import { FileTransactionRepository } from 'src/Context/Backoffice/Transaction/infraestructure/persistence/FileTransactionRepository'
import { Uuid } from 'src/Context/Shared/domain/value-object/Uuid'

let id = Uuid.random()

describe('Save Transaction', () => {
  it('should save a transaction', async () => {
    const repository = new FileTransactionRepository()
    const expectedTransaction = new Transaction({ id, sellerDomain: 'example.com', kind: 'WALLET', invoiceNumber: 1, amount: 100, total: 100, status: 'PENDING' })

    await repository.save(expectedTransaction)
  })
})

afterAll(async () => {
  const repository = new FileTransactionRepository()
  await repository.delete(id.value)
})
