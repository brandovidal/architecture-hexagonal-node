import { object, string } from 'zod'

export const createTransactionSchema = object({
  body: object({
    seller_domain: string()
  })
})
