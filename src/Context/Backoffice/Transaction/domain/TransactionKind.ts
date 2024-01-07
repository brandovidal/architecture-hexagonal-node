import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'

const VALID_TRANSACTION_KIND = ['WALLET', 'PAYMENT']

export class TransactionKind extends StringValueObject {
  constructor (value: string) {
    super(value)
    this.ensureIsValidKind(value)
  }

  private ensureIsValidKind (value: string): void {
    if (!VALID_TRANSACTION_KIND.includes(value)) {
      throw new InvalidArgumentError(`The transaction kind ${value} is not valid`)
    }
  }
}
