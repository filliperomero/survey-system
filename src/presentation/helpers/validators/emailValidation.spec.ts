import { EmailValidation } from './emailValidation'
import { InvalidParamError } from '../../errors'
import { EmailValidator } from '@presentation/protocols/emailValidator'

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()

  const sut = new EmailValidation(emailValidatorStub, 'email')

  return { sut, emailValidatorStub }
}

describe('Email Validation', () => {
  it('should be able to return an error when EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const error = sut.validate({ email: 'joe.doe@mail.com' })

    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('should be able to throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })

  it('should be able to call the EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.validate({ email: 'joe.doe@mail.com' })
    expect(isValidSpy).toHaveBeenCalledWith('joe.doe@mail.com')
  })
})
