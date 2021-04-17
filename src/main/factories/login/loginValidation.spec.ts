import { makeLoginValidation } from './loginValidation'
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@presentation/helpers/validators'
import { EmailValidator, Validation } from '@presentation/protocols'

jest.mock('@presentation/helpers/validators/ValidationComposite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  it('should be able to call validationComposite with all validations necessary', () => {
    makeLoginValidation()
    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation(makeEmailValidator(), 'email'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
