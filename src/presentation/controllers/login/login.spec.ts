import { LoginController } from './login'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/httpHelper'
import { MissingParamError, ServerError } from '@presentation/errors'
import { HttpRequest, Authentication, Validation } from './loginProtocols'

interface SutTypes {
  sut: LoginController
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  class AuthenticationStub implements Authentication {
    async auth(email: string, password: string): Promise<string> {
      return Promise.resolve('any token')
    }
  }
  const authenticationStub = new AuthenticationStub()

  class ValidationStub implements Validation {
    validate(data: any): Error {
      return null
    }
  }
  const validationStub = new ValidationStub()

  const sut = new LoginController(authenticationStub, validationStub)

  return {
    sut,
    validationStub,
    authenticationStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'joe.doe@mail.com',
    password: 'any password'
  }
})

describe('Login Controller', () => {
  it('should be able to call the Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()

    const authSpy = jest.spyOn(authenticationStub, 'auth')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith('joe.doe@mail.com', 'any password')
  })

  it('should be able to return status 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Error())

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('should be able to return status 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(null)

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(unauthorized())
  })

  it('should be able to return status 200 when data is valid', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok({ accessToken: 'any token' }))
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
