import { badRequest, serverError, unauthorized, ok } from '@presentation/helpers/http/httpHelper'
import { Validation, Controller, HttpRequest, HttpResponse, Authentication } from './loginProtocols'

export class LoginController implements Controller {
  constructor(private authentication: Authentication, private validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) return badRequest(error)

      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
