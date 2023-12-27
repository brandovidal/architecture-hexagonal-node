import { Container } from 'inversify'

import PrismaTransactionRepository from '../../Context/Transaction/infraestructure/persistence/PrismaTransactionRepository'

import TransactionsFinder from '../../Context/Transaction/application/TransactionsFinder'
import TransactionCreator from '../../Context/Transaction/application/TransactionCreator'
import TransactionUpdator from '../../Context/Transaction/application/TransactionUpdator'
import TransactionDeletor from '../../Context/Transaction/application/TransactionDeletor'

import TransactionsGetController from '../controllers/TransactionsGetController'
import TransactionPostController from '../controllers/TransactionPostController'
import TransactionPutController from '../controllers/TransactionPutController'
import TransactionDeleteController from '../controllers/TransactionDeleteController'

const container = new Container()

container.bind('TransactionRepository').to(PrismaTransactionRepository)

container.bind('TransactionReader').to(TransactionsFinder)
container.bind('TransactionGetController').to(TransactionsGetController)

container.bind('TransactionCreator').to(TransactionCreator)
container.bind('TransactionPostController').to(TransactionPostController)

container.bind('TransactionUpdator').to(TransactionUpdator)
container.bind('TransactionPutController').to(TransactionPutController)

container.bind('TransactionDeletor').to(TransactionDeletor)
container.bind('TransactionDeleteController').to(TransactionDeleteController)

export default container
