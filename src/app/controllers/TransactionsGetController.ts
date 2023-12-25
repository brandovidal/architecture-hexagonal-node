import type { Request, Response } from 'express'
import type { Controller } from './Controller'

import TransactionsFinder from '../../Context/Transaction/application/TransactionsFinder'

import httpStatus from 'http-status'
import { inject, injectable } from 'inversify'

@injectable()
export default class TransactionsGetController implements Controller {
  constructor (@inject('TransactionReader') private readonly reader: TransactionsFinder) {}

  async run (_req: Request, res: Response): Promise<void> {
    const data = await this.reader.run()
    res.status(httpStatus.OK).send({
      success: true,
      message: 'Transactions retrieved successfully',
      data
    })
  }
}
