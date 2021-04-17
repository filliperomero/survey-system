import { LogErrorRepository } from '@data/protocols/logErrorRepository'
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor(private controller: Controller, private logErrorRepository: LogErrorRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }

    return httpResponse
  }
}
