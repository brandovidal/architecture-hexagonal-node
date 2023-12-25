import HealthCheckGetController from '../controllers/HealthCheckGetController'
import HealthCheckReader from '../../Context/status/application/HealthCheckReader'
import InMemoryHealthCheckRepository from '../../Context/status/infraestructure/InMemoryHealthCheckRepository'

import { Container } from 'inversify'

const container = new Container()

container
  .bind('InMemoryHealthCheckRepository')
  .to(InMemoryHealthCheckRepository)
container.bind('HealthCheckReader').to(HealthCheckReader)
container.bind('HealthCheckGetController').to(HealthCheckGetController)

export default container
