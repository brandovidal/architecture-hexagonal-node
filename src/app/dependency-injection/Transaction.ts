import { Container } from 'inversify'

import SqlLiteTransactionRepository from '../../Context/transaction/infraestructure/persistence/SqlLiteTransactionRepository'

import TransactionGetController from '../controllers/TransactionGetController'
import TransactionReader from '../../Context/transaction/application/TransactionReader'

import TransactionPostController from '../controllers/TransactionPostController'
import TransactionCreator from '../../Context/transaction/application/TransactionCreator'

const container = new Container()

container.bind('SqlLiteTransactionRepository').to(SqlLiteTransactionRepository)

container.bind('TransactionReader').to(TransactionReader)
container.bind('TransactionGetController').to(TransactionGetController)

container.bind('TransactionCreator').to(TransactionCreator)
container.bind('TransactionPostController').to(TransactionPostController)

export default container
