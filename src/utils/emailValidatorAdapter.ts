import validator from 'validator'

import { EmailValidator } from '../presentation/protocols/emailValidator'

export class EmailValidatorAdapter implements EmailValidator {
  public isValid(email: string): boolean {
    return validator.isEmail(email)
  }
}
