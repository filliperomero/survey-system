import { makeSignUpValidation } from './signupValidation'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'
import { RequiredFieldValidation } from '@presentation/helpers/validators/requiredFieldValidation'
import { Validation } from '@presentation/helpers/validators/validation'

jest.mock('@presentation/helpers/validators/ValidationComposite')

describe('SignUpValidation Factory', () => {
  it('should be able to call validationComposite with all validations necessary', () => {
    makeSignUpValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
