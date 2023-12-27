import { Container } from 'inversify'

import MongoTransactionRepository from '../../Context/Transaction/infraestructure/persistence/MongoTransactionRepository'
import { MongoRepository } from '../../Context/Shared/infraestructure/persistence/mongo/MongoRepository'

import TransactionsGetController from '../controllers/TransactionsGetController'
import TransactionsFinder from '../../Context/Transaction/application/TransactionsFinder'

import TransactionPostController from '../controllers/TransactionPostController'
import TransactionCreator from '../../Context/Transaction/application/TransactionCreator'
import { MongoClient } from 'mongodb'

const container = new Container()

container.bind(MongoRepository).toSelf()
container.bind(MongoClient).toSelf()
container.bind('TransactionRepository').to(MongoTransactionRepository)

container.bind('TransactionReader').to(TransactionsFinder)
container.bind('TransactionGetController').to(TransactionsGetController)

container.bind('TransactionCreator').to(TransactionCreator)
container.bind('TransactionPostController').to(TransactionPostController)

export default container
