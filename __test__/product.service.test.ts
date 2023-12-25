import { Product } from '../src/Context/product/domain/product'
import { ProductRepository } from '../src/Context/product/domain/interfaces/product.interface'
import { ProductService } from '../src/Context/product/application/product.service'

import { describe, expect, it, beforeAll } from 'vitest'

class MockProductRepository implements ProductRepository {
  private order: Product[] = []
  public async findAll (): Promise<Product[]> {
    return this.order
  }
  public async save (order: Product) {
    this.order.push(order)
    return order
  }
}

describe('ProductService', () => {
  let service: ProductService

  beforeAll(() => {
    const repository = new MockProductRepository()
    service = new ProductService(repository)
  })
  
  it('should get all products', async () => {
    const productListExpected = await service.findAll()

    expect(productListExpected.length).toEqual(0)
  })

  it('should save an product', async () => {
    const product = new Product('Product 1', 50)
    const productExpected = await service.save('Product 1', 50)

    expect(productExpected.name).toBe(product.name)
    expect(productExpected.price).toBe(product.price)

    const productListExpected = await service.findAll()
    expect(productListExpected.length).toEqual(1)
  })
})
