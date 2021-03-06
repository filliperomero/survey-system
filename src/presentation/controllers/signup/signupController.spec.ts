import { SignUpController } from './signupController'
import { MissingParamError, ServerError } from '../../errors'
import { AddAccount, AddAccountModel, AccountModel, Validation } from './signupControllerProtocols'
import { HttpRequest } from '../../protocols'
import { ok, badRequest, serverError } from '../../helpers/http/httpHelper'

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  class AddAccountStub implements AddAccount {
    async execute(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid id',
        ...account
      }

      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  const addAccountStub = new AddAccountStub()

  class ValidationStub implements Validation {
    validate(data: any): Error {
      return null
    }
  }
  const validationStub = new ValidationStub()

  const sut = new SignUpController(addAccountStub, validationStub)

  return {
    sut,
    addAccountStub,
    validationStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'Joe doe',
    email: 'joe.doe@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

describe('SignUp Controller', () => {
  it('should be able to create an account', async () => {
    const { sut, addAccountStub } = makeSut()

    const addSpy = jest.spyOn(addAccountStub, 'execute')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'Joe doe',
      email: 'joe.doe@mail.com',
      password: 'any_password'
    })
  })

  it('should be able to return status 200 when data is valid', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(
      ok({
        id: 'valid id',
        name: 'Joe doe',
        email: 'joe.doe@mail.com',
        password: 'any_password'
      })
    )
  })

  it('should be able to return status 500 if addAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'execute').mockRejectedValueOnce(new Error())

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('should be able to call validation with valid values', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should be able to return status 400 when validation returns an error', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any field'))

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any field')))
  })
})
