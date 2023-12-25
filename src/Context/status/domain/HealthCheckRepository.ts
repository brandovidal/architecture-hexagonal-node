import type { HealthCheck } from './HealthCheck'

export interface HealthCheckRepository {
  check: () => Promise<HealthCheck>
}
