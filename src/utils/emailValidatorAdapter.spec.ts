import validator from 'validator'
import { EmailValidatorAdapter } from './emailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  it('should be able to return false when the email is invalid', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    expect(sut.isValid('invalid_email')).toBeFalsy()
  })

  it('should be able to return true when the email is valid', () => {
    const sut = makeSut()

    expect(sut.isValid('joe.doe@mail.com')).toBeTruthy()
  })

  it('should be able to return true when the email is valid', () => {
    const sut = makeSut()

    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid('joe.doe@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('joe.doe@mail.com')
  })
})
