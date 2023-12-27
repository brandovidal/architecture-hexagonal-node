import { inject, injectable } from 'inversify'
import { TransactionRepository } from '../domain/TransactionRepository'

@injectable()
export default class TransactionDeletor {
  constructor (@inject('TransactionRepository') private readonly repository: TransactionRepository) {}

  async run (id: string) {
    await this.repository.delete(id)
  }
}
