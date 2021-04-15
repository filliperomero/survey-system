import validator from 'validator'
import { EmailValidatorAdapter } from './emailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  it('should be able to return false when the email is invalid', () => {
    const sut = new EmailValidatorAdapter()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    expect(sut.isValid('invalid_email')).toBeFalsy()
  })

  it('should be able to return true when the email is valid', () => {
    const sut = new EmailValidatorAdapter()

    expect(sut.isValid('joe.doe@mail.com')).toBeTruthy()
  })
})
