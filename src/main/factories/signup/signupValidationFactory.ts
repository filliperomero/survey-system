import { Validation } from '@presentation/controllers/signup/signupControllerProtocols'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'
import {
  CompareFieldValidation,
  EmailValidation,
  RequiredFieldValidation
} from '@presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../adapters/validators/emailValidatorAdapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))

  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))

  return new ValidationComposite(validations)
}
