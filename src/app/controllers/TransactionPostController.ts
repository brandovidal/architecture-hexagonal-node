/* eslint-disable @typescript-eslint/naming-convention */
import type { Request, Response } from 'express'
import type { Controller } from './Controller'

import TransactionCreator from '../../Context/transaction/application/TransactionCreator'

import httpStatus from 'http-status'
import { inject, injectable } from 'inversify'

interface TransactionPostRequest extends Request {
  body: {
    id: number
    seller_domain: string
    kind: string
    invoice_number: number
    amount: number
    total: number
    status: string
    user_created: string
    user_updated: string
  }
}

@injectable()
export default class TransactionPostController implements Controller {
  constructor (@inject('TransactionCreator') private readonly creator: TransactionCreator) {}

  async run (req: TransactionPostRequest, res: Response): Promise<void> {
    try {
      const { seller_domain, kind, invoice_number, amount, total, status, user_created, user_updated } = req.body

      await this.creator.run(seller_domain, kind, invoice_number, amount, total, status, user_created, user_updated)

      res.status(httpStatus.CREATED).send({
        success: true,
        message: 'Transaction created successfully',
        data: req.body
      })
    } catch (error: unknown) {
      console.error('Error trying to create transaction', error)

      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        error: {
          message: 'Error trying to create transaction',
          details: error
        }
      })
    }
  }
}
