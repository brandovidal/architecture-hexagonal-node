import type { Request, Response } from 'express'
import type { Controller } from './Controller'

import httpStatus from 'http-status'
import { inject, injectable } from 'inversify'

import HealthCheckReader from '../../Context/status/application/HealthCheckReader'

@injectable()
export default class HealthCheckGetController implements Controller {
  constructor (@inject('HealthCheckReader') private readonly service: HealthCheckReader) {}

  async run (_req: Request, res: Response): Promise<void> {
    const data = await this.service.run()
    res.status(httpStatus.OK).send(data)
  }
}
