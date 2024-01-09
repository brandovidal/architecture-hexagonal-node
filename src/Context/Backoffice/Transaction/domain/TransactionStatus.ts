import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { TransactionStatusInvalid } from './TransactionStatusInvalid'

export type TransactionStatusValue = 'PENDING' | 'SUCCESS' | 'FAILED'
export enum TransactionStatusType {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export class TransactionStatus extends StringValueObject {
  constructor (value: string, omitValidation = false) {
    super(value)

    if (!omitValidation) {
      this.ensureIsValidStatus(value)
    }
  }

  private ensureIsValidStatus (value: string): void {
    if (TransactionStatusType[value as TransactionStatusValue] === undefined) {
      throw new TransactionStatusInvalid(`The transaction status ${value} is not valid`)
    }
  }
}
