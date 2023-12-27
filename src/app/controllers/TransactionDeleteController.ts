/* eslint-disable @typescript-eslint/naming-convention */
import type { Request, Response } from 'express'

import httpStatus from 'http-status'
import { inject, injectable } from 'inversify'

import type { Controller } from './Controller'
import TransactionDeletor from '../../Context/Backoffice/Transaction/application/TransactionDeletor'

interface TransactionDeleteRequest extends Request {
  body: {
    id: string
  }
}

@injectable()
export default class TransactionDeleteController implements Controller {
  constructor (@inject('TransactionDeletor') private readonly updator: TransactionDeletor) {}

  async run (req: TransactionDeleteRequest, res: Response): Promise<void> {
    try {
      const { id } = req.body

      await this.updator.run(id)

      res.status(httpStatus.CREATED).send({
        success: true,
        message: 'Transaction deleted successfully',
        data: req.body
      })
    } catch (error: unknown) {
      console.error('Error trying to delete transaction', error)

      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        error: {
          message: 'Error trying to delete transaction',
          details: error
        }
      })
    }
  }
}
