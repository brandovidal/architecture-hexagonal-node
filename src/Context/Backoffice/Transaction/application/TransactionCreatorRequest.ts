import { Uuid } from "../../../../Context/Shared/domain/value-object/Uuid"

export interface TransactionCreatorRequest {
  id: string
  seller_domain: string
  kind: string
  invoice_number: number
  amount: number
  total: number
  status: string
  user_created: string
  user_updated: string
  created_at?: Date
  updated_at?: Date
}