import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class TransactionSellerName extends StringValueObject {
  constructor (value: string) {
    super(value)
    this.ensureLengthIsMoreThanFiveCharacters(value)
    this.ensureLengthIsLessThanOneHundredCharacters(value)
  }

  private ensureLengthIsMoreThanFiveCharacters (value: string): void {
    if (value.length < 5) {
      throw new InvalidArgumentError(`The Transaction seller name <${value}> has less than 5 characters`)
    }
  }

  private ensureLengthIsLessThanOneHundredCharacters (value: string): void {
    if (value.length > 100) {
      throw new InvalidArgumentError(`The Transaction seller name <${value}> has more than 100 characters`)
    }
  }
}
