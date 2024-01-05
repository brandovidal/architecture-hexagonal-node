import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'
import { FileTransactionRepository } from 'src/Context/Backoffice/Transaction/infraestructure/persistence/FileTransactionRepository'

describe('Save Transaction', () => {
  it('should save a transaction', async () => {
    const repository = new FileTransactionRepository()
    const transaction = new Transaction('1', 'example.com', 'WALLET', 1, 100, 100, 'PENDING', 'user', 'user')

    await repository.save(transaction)
  })
})
