import { InvalidParamError } from '@presentation/errors'
import { EmailValidator, Validation } from '@presentation/protocols'

export class EmailValidation implements Validation {
  constructor(private emailValidator: EmailValidator, private fieldName: string) {}

  validate(data: any): Error {
    if (!this.emailValidator.isValid(data[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
