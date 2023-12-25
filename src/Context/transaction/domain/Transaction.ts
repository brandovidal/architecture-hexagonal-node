export class Transaction {
  id?: number

  sellerDomain: string
  kind: string

  invoiceNumber: number

  amount: number
  total: number

  status: string

  userCreated: string
  userUpdated: string

  createdAt: Date
  updatedAt: Date

  constructor (id: number, sellerDomain: string, kind: string, invoiceNumber: number, amount: number, total: number, status: string, userCreated: string, userUpdated: string, createdAt: Date, updatedAt: Date) {
    this.id = id
    this.sellerDomain = sellerDomain
    this.kind = kind
    this.invoiceNumber = invoiceNumber
    this.amount = amount
    this.total = total
    this.status = status
    this.userCreated = userCreated
    this.userUpdated = userUpdated
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
