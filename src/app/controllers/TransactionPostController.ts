import type { Request, Response } from 'express'
import type { Controller } from './Controller'

import TransactionCreator from '../../Context/transaction/application/TransactionCreator'

import httpStatus from 'http-status'
import { inject, injectable } from 'inversify'

interface CreateTransactionRequest {
  id: number
  sellerDomain: string
  kind: string
  invoiceNumber: number
  amount: number
  total: number
  status: string
  userCreated: string
  userUpdated: string
  createdAt: Date
  updatedAt: Date
}

@injectable()
export default class TransactionPostController implements Controller {
  constructor (@inject('TransactionCreator') private readonly creator: TransactionCreator) {}

  async run (req: Request, res: Response): Promise<void> {
    try {
      const { id, sellerDomain, kind, invoiceNumber, amount, total, status, userCreated, userUpdated, createdAt, updatedAt } = req.body as CreateTransactionRequest

      await this.creator.run(id, sellerDomain, kind, invoiceNumber, amount, total, status, userCreated, userUpdated, createdAt, updatedAt)

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
