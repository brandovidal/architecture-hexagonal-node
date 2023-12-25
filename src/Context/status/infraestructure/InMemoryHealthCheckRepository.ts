import { injectable } from 'inversify'
import type { HealthCheck } from '../domain/HealthCheck'
import type { HealthCheckRepository } from '../domain/HealthCheckRepository'

@injectable()
export default class InMemoryHealthCheckRepository implements HealthCheckRepository {
  async check (): Promise<HealthCheck> {
    return {
      status: true,
      data: 'OK'
    }
  }
}
