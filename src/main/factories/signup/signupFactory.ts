import { Controller } from '@presentation/protocols'
import { SignUpController } from '@presentation/controllers/signup/signupController'
import { DbAddAccount } from '@data/useCases/addAccount/dbAddAccount'
import { BcryptAdapter } from '@infra/criptography/bcryptAdapter/bcryptAdapter'
import { AccountMongoRepository } from '@infra/db/mongodb/accountRepository/accountMongoRepository'
import { LogMongoRepository } from '@infra/db/mongodb/logRepository/logMongoRepository'
import { LogControllerDecorator } from '../../decorators/logControllerDecorator'
import { makeSignUpValidation } from './signupValidationFactory'

export const makeSignUpController = (): Controller => {
  const dbAddAccount = new DbAddAccount(new BcryptAdapter(), new AccountMongoRepository())

  return new LogControllerDecorator(
    new SignUpController(dbAddAccount, makeSignUpValidation()),
    new LogMongoRepository()
  )
}
