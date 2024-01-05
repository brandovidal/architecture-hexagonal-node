import type { Request, Response, Router } from 'express'

import container from '../dependency-injection'

import TransactionsGetController from '../controllers/TransactionsGetController'
import TransactionPostController from '../controllers/TransactionPostController'
import TransactionPutController from '../controllers/TransactionPutController'
import TransactionDeleteController from '../controllers/TransactionDeleteController'

function register (router: Router) {
  const transactionGetController = container.resolve(TransactionsGetController)
  router.get('/transactions', (req: Request, res: Response) => transactionGetController.run(req, res))

  const transactionPostController = container.resolve(TransactionPostController)
  router.post('/transaction', (req: Request, res: Response) => transactionPostController.run(req, res))

  const transactionPutController = container.resolve(TransactionPutController)
  router.put('/transaction/:id', (req: Request, res: Response) => transactionPutController.run(req, res))

  const transactionDeleteController = container.resolve(TransactionDeleteController)
  router.delete('/transaction/:id', (req: Request, res: Response) => transactionDeleteController.run(req, res))
}

export default register
