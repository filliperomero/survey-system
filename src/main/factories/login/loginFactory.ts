import { makeLoginValidation } from './loginValidationFactory'
import env from '../../config/env'

import { Controller } from '@presentation/protocols'
import { LoginController } from '@presentation/controllers/login/loginController'
import { DbAuthentication } from '@data/useCases/authentication/dbAuthentication'
import { AccountMongoRepository } from '@infra/db/mongodb/accountRepository/accountMongoRepository'
import { BcryptAdapter } from '@infra/criptography/bcryptAdapter/bcryptAdapter'
import { JwtAdapter } from '@infra/criptography/jwtAdapter/jwtAdapter'
import { LogMongoRepository } from '@infra/db/mongodb/logRepository/logMongoRepository'
import { LogControllerDecorator } from '../../decorators/logControllerDecorator'

export const makeLoginController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    new BcryptAdapter(),
    new JwtAdapter(env.jwtSecret),
    accountMongoRepository
  )

  return new LogControllerDecorator(
    new LoginController(dbAuthentication, makeLoginValidation()),
    new LogMongoRepository()
  )
}
