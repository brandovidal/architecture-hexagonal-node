import { Container } from 'inversify'

import SqlLiteTransactionRepository from '../../Context/Backoffice/Transaction/infraestructure/persistence/SqlLiteTransactionRepository'

import TransactionsGetController from '../controllers/TransactionsGetController'
import TransactionsFinder from '../../Context/Backoffice/Transaction/application/TransactionsFinder'

import TransactionPostController from '../controllers/TransactionPostController'
import TransactionCreator from '../../Context/Backoffice/Transaction/application/TransactionCreator'

const container = new Container()

container.bind('TransactionRepository').to(SqlLiteTransactionRepository)

container.bind('TransactionReader').to(TransactionsFinder)
container.bind('TransactionGetController').to(TransactionsGetController)

container.bind('TransactionCreator').to(TransactionCreator)
container.bind('TransactionPostController').to(TransactionPostController)

export default container
