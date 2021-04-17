import { Validation } from '@presentation/controllers/signup/signupProtocols'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'
import { RequiredFieldValidation } from '@presentation/helpers/validators/requiredFieldValidation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
