import { Order } from '../src/Context/order/domain/order'
import { OrderRepository } from '../src/Context/order/domain/interfaces/order.interface'
import { OrderService } from '../src/Context/order/application/order.service'

import { describe, expect, it, beforeAll } from 'vitest'

class MockOrderRepository implements OrderRepository {
  private order: Order[] = []
  public async save (order: Order) {
    this.order.push(order)
    return order
  }
}

describe('OrderService', () => {
  let service: OrderService

  beforeAll(() => {
    const repository = new MockOrderRepository()
    service = new OrderService(repository)
  })

  it('should save an order', async () => {
    const order = new Order(1, 10)
    const orderExpected = await service.save(1, 10)

    expect(orderExpected.productId).toBe(order.productId)
    expect(orderExpected.total).toBe(order.total)
  })
})
