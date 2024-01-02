import type { Request, Response, Router } from 'express'

import container from '../dependency-injection'
import HealthCheckGetController from '../controllers/HealthCheckGetController'

function register (router: Router) {
  const controller = container.resolve(HealthCheckGetController)
  router.get('/status', (req: Request, res: Response) => controller.run(req, res))
}

export default register
