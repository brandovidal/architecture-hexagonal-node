import type { Request, Response, Router } from 'express'

import container from '../dependency-injection'
import HealthCheckGetController from '../controllers/HealthCheckGetController'

import prisma from '../../../../prisma'

function register (router: Router) {
  const controller = container.resolve(HealthCheckGetController)
  router.get('/status', (req: Request, res: Response) => controller.run(req, res))

  router.get('/metrics', async (_req, res: Response) => {
    const metrics = await prisma.$metrics.prometheus()

    res.send(metrics)
  })
}

export default register
