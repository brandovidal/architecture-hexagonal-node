import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class TransactionSellerName extends StringValueObject {
  constructor (value: string) {
    super(value)
    this.ensureLengthIsMoreThanFourCharacters(value)
  }

  private ensureLengthIsMoreThanFourCharacters (value: string): void {
    if (value.length < 4) {
      throw new InvalidArgumentError(`The Transaction seller name <${value}> has less than 4 characters`)
    }
  }
}
