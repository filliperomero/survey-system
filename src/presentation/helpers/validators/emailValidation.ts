import { InvalidParamError } from '@presentation/errors'
import { EmailValidator } from '@presentation/protocols/emailValidator'
import { Validation } from './validation'

export class EmailValidation implements Validation {
  constructor(private emailValidator: EmailValidator, private fieldName: string) {}

  validate(data: any): Error {
    if (!this.emailValidator.isValid(data[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
