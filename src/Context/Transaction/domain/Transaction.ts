export class Transaction {
  id?: string

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

  constructor (
    id: string | undefined,
    sellerDomain: string,
    kind: string,
    invoiceNumber: number,
    amount: number,
    total: number,
    status: string,
    userCreated: string,
    userUpdated: string,
    createdAt: Date,
    updatedAt: Date
  ) {
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

  static create (id: string | undefined = undefined, sellerDomain: string, kind: string, invoiceNumber: number, amount: number, total: number, status: string, userCreated: string, userUpdated: string) {
    return new Transaction(id, sellerDomain, kind, invoiceNumber, amount, total, status, userCreated, userUpdated, new Date(), new Date())
  }

  static fromPrimitives (plainData: {
    id: string
    seller_domain: string
    kind: string
    invoice_number: number
    amount: number
    total: number
    status: string
    user_created: string
    user_updated: string
    created_at: Date
    updated_at: Date
  }): Transaction {
    return new Transaction(
      plainData?.id,
      plainData.seller_domain,
      plainData.kind,
      plainData.invoice_number,
      plainData.amount,
      plainData.total,
      plainData.status,
      plainData.user_created,
      plainData.user_updated,
      plainData.created_at,
      plainData.updated_at
    )
  }

  toPrimitives () {
    return {
      id: this.id,
      seller_domain: this.sellerDomain,
      kind: this.kind,
      invoice_number: this.invoiceNumber,
      amount: this.amount,
      total: this.total,
      status: this.status,
      user_created: this.userCreated,
      user_updated: this.userUpdated,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
  }
}
