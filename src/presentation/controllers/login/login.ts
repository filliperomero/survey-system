import { InvalidParamError, MissingParamError } from '@presentation/errors'
import { badRequest, serverError, unauthorized, ok } from '@presentation/helpers/httpHelper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  EmailValidator,
  Authentication
} from './loginProtocols'

export class LoginController implements Controller {
  constructor(private emailValidator: EmailValidator, private authentication: Authentication) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
