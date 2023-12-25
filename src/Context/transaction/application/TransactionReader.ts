import { inject, injectable } from 'inversify'
import SqlLiteTransactionRepository from '../infraestructure/persistence/SqlLiteTransactionRepository'

@injectable()
export default class TransactionReader {
  constructor (@inject('SqlLiteTransactionRepository') private readonly repository: SqlLiteTransactionRepository) {}

  async run () {
    return await this.repository.findAll()
  }
}
