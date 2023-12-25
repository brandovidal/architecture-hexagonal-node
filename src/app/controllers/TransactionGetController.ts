import type { Request, Response } from 'express'
import type { Controller } from './Controller'

import TransactionReader from '../../Context/transaction/application/TransactionReader'

import httpStatus from 'http-status'
import { inject, injectable } from 'inversify'

@injectable()
export default class TransactionGetController implements Controller {
  constructor (@inject('TransactionReader') private readonly service: TransactionReader) {}

  async run (_req: Request, res: Response): Promise<void> {
    const data = await this.service.run()
    res.status(httpStatus.CREATED).send(data)
  }
}
