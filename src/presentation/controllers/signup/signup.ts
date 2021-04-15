import { badRequest, serverError, ok } from '../../helpers/httpHelper'
import {
  HttpRequest,
  HttpResponse,
  EmailValidator,
  Controller,
  AddAccount
} from '../signup/signupProtocols'
import { MissingParamError, InvalidParamError } from '../../errors'

export class SignUpController implements Controller {
  constructor(private emailValidator: EmailValidator, private addAccount: AddAccount) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.execute({ name, email, password })

      return ok(account)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
