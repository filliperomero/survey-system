import { badRequest, serverError, ok } from '../../helpers/http/httpHelper'
import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  Validation
} from './signupControllerProtocols'

export class SignUpController implements Controller {
  constructor(private addAccount: AddAccount, private validation: Validation) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body

      const error = this.validation.validate(httpRequest.body)

      if (error) return badRequest(error)

      const account = await this.addAccount.execute({ name, email, password })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
