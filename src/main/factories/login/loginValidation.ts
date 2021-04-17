import { Validation } from '@presentation/controllers/signup/signupProtocols'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'
import { RequiredFieldValidation } from '@presentation/helpers/validators/requiredFieldValidation'
import { EmailValidatorAdapter } from '@utils/emailValidatorAdapter'
import { EmailValidation } from '@presentation/helpers/validators/emailValidation'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))

  return new ValidationComposite(validations)
}
