import { Container } from 'inversify'

import PrismaTransactionRepository from '../../Context/Transaction/infraestructure/persistence/PrismaTransactionRepository'

import TransactionsGetController from '../controllers/TransactionsGetController'
import TransactionsFinder from '../../Context/Transaction/application/TransactionsFinder'

import TransactionPostController from '../controllers/TransactionPostController'
import TransactionCreator from '../../Context/Transaction/application/TransactionCreator'

const container = new Container()

container.bind('TransactionRepository').to(PrismaTransactionRepository)

container.bind('TransactionReader').to(TransactionsFinder)
container.bind('TransactionGetController').to(TransactionsGetController)

container.bind('TransactionCreator').to(TransactionCreator)
container.bind('TransactionPostController').to(TransactionPostController)

export default container
