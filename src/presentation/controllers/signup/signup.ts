import { badRequest, serverError, ok } from '../../helpers/httpHelper'
import {
  HttpRequest,
  HttpResponse,
  EmailValidator,
  Controller,
  AddAccount,
  Validation
} from '../signup/signupProtocols'
import { InvalidParamError } from '../../errors'

export class SignUpController implements Controller {
  constructor(
    private emailValidator: EmailValidator,
    private addAccount: AddAccount,
    private validation: Validation
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body

      const error = this.validation.validate(httpRequest.body)

      if (error) return badRequest(error)

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.execute({ name, email, password })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
