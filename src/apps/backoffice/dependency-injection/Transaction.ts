import { Container } from 'inversify'

import TransactionReader from '../../../Context/Backoffice/Transaction/application/TransactionReader'
import TransactionCreator from '../../../Context/Backoffice/Transaction/application/TransactionCreator'
import TransactionUpdator from '../../../Context/Backoffice/Transaction/application/TransactionUpdator'
import TransactionDeletor from '../../../Context/Backoffice/Transaction/application/TransactionDeletor'

import TransactionsGetController from '../controllers/TransactionsGetController'
import TransactionPostController from '../controllers/TransactionPostController'
import TransactionPutController from '../controllers/TransactionPutController'
import TransactionDeleteController from '../controllers/TransactionDeleteController'

import { TypeOrmTransactionRepository } from '../../../Context/Backoffice/Transaction/infraestructure/persistence/TypeOrmTransactionRepository'
import { TypeOrmClientFactory } from '../../../Context/Shared/infraestructure/persistence/typeorm/TypeOrmClientFactory'

const container = new Container()

container.bind('TypeOrmClientFactory').to(TypeOrmClientFactory)
container.bind('TransactionRepository').to(TypeOrmTransactionRepository)

container.bind('Backoffice.Transaction.application.TransactionReader').to(TransactionReader)
container.bind(TransactionsGetController).toSelf()

container.bind('Backoffice.Transaction.application.TransactionCreator').to(TransactionCreator)
container.bind(TransactionPostController).toSelf()

container.bind('Backoffice.Transaction.application.TransactionUpdator').to(TransactionUpdator)
container.bind(TransactionPutController).toSelf()

container.bind('Backoffice.Transaction.application.TransactionDeletor').to(TransactionDeletor)
container.bind(TransactionDeleteController).toSelf()

export default container
