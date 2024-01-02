import { v4 as uuid } from 'uuid'
import validate from 'uuid-validate'

export class Uuid {
  constructor (value: string) {
    this.ensureIsValidUuid(value)
  }

  static random (): Uuid {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new Uuid(uuid())
  }

  private ensureIsValidUuid (id: string): void {
    if (!validate(id)) {
      throw new Error(`<${this.constructor.name}> does not allow the value <${id}>`)
    }
  }
}
