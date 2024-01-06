import { serialize, deserialize } from 'bson'
import fs from 'fs'
import path from 'path'

import { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

export class FileTransactionRepository implements TransactionRepository {
  private readonly FILE_PATH = path.join(__dirname, '/transactions')

  async save (transaction: Transaction) {
    void fs.promises.writeFile(this.filePath(transaction.id.value), serialize(transaction))
  }

  private filePath (id: string) {
    return `${this.FILE_PATH}.${id}.repo`
  }

  async search (transactionId: string): Promise<Transaction> {
    const courseData = await fs.promises.readFile(this.filePath(transactionId))
    const { id, sellerDomain, kind, invoiceNumber, amount, total, status, userCreated, userUpdated, createdAt, updatedAt } = deserialize(courseData)
    return new Transaction({ id, sellerDomain, kind, invoiceNumber, amount, total, status, userCreated, userUpdated, createdAt, updatedAt })
  }

  async delete (id: string) {
    void fs.promises.unlink(this.filePath(id))
  }
}
