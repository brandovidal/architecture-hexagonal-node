import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'

export const VALID_TRANSACTION_STATUS = ['PENDING', 'SUCCESS', 'FAILED']

export class TransactionStatus extends StringValueObject {
  constructor (value: string) {
    super(value)
    this.ensureIsValidStatus(value)
  }

  private ensureIsValidStatus (value: string): void {
    if (!VALID_TRANSACTION_STATUS.includes(value)) {
      throw new InvalidArgumentError(`The transaction status ${value} is not valid`)
    }
  }
}
