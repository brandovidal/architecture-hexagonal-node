import type { Request, Response, Router } from 'express'

import container from '../dependency-injection'
import TransactionsGetController from '../controllers/TransactionsGetController'
import TransactionPostController from '../controllers/TransactionPostController'

function register (router: Router) {
  const transactionGetController = container.resolve(TransactionsGetController)
  router.get('/transaction', (req: Request, res: Response) => transactionGetController.run(req, res))

  const transactionPostController = container.resolve(TransactionPostController)
  router.post('/transaction', (req: Request, res: Response) => transactionPostController.run(req, res))
}

export default register
