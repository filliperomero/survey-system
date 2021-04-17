import { Validation } from '@presentation/controllers/signup/signupProtocols'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'
import { RequiredFieldValidation } from '@presentation/helpers/validators/requiredFieldValidation'
import { CompareFieldValidation } from '@presentation/helpers/validators/compareFieldValidation'
import { EmailValidatorAdapter } from '@utils/emailValidatorAdapter'
import { EmailValidation } from '@presentation/helpers/validators/emailValidation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))

  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))

  return new ValidationComposite(validations)
}
