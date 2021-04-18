import { Validation } from '@presentation/controllers/signup/signupControllerProtocols'
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation
} from '@presentation/helpers/validators'
import { EmailValidatorAdapter } from '@utils/emailValidatorAdapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))

  return new ValidationComposite(validations)
}
