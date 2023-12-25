import { Container } from 'inversify'

import HealthCheck from './HealthCheck'
import Product from './Product'
import Transaction from './Transaction'

const container = Container.merge(HealthCheck, Product, Transaction)

export default container
