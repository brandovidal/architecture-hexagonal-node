import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'
import { TransactionId } from 'src/Context/Backoffice/Transaction/domain/TransactionId'
import { FileTransactionRepository } from 'src/Context/Backoffice/Transaction/infraestructure/persistence/FileTransactionRepository'

const id = TransactionId.random()

describe('Save Transaction', () => {
  it('should save a transaction', async () => {
    const repository = new FileTransactionRepository()
    const expectedTransaction = new Transaction(id, 'example.com', 'WALLET', 1, 100, 100, 'PENDING', 'user', 'user')

    await repository.save(expectedTransaction)
  })
})

afterAll(async () => {
  const repository = new FileTransactionRepository()
  await repository.delete(id.value)
})
