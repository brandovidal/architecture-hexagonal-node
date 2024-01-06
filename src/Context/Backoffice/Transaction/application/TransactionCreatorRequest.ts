export interface TransactionCreatorRequest {
  id: string
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
}
