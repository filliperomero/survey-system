import { makeSignUpValidation } from './signupValidation'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'
import { RequiredFieldValidation } from '@presentation/helpers/validators/requiredFieldValidation'
import { Validation } from '@presentation/helpers/validators/validation'
import { CompareFieldValidation } from '@presentation/helpers/validators/compareFieldValidation'

jest.mock('@presentation/helpers/validators/ValidationComposite')

describe('SignUpValidation Factory', () => {
  it('should be able to call validationComposite with all validations necessary', () => {
    makeSignUpValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
