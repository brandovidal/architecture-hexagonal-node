import { inject, injectable } from 'inversify'

import InMemoryHealthCheckRepository from '../infraestructure/InMemoryHealthCheckRepository'

@injectable()
export default class HealthCheckReader {
  constructor (@inject('InMemoryHealthCheckRepository') private readonly repository: InMemoryHealthCheckRepository) {}

  async run () {
    return await this.repository.check()
  }
}
