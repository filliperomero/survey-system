import { Controller } from '@presentation/protocols'
import { SignUpController } from '@presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '@utils/emailValidatorAdapter'
import { DbAddAccount } from '@data/useCases/addAccount/dbAddAccount'
import { BcryptAdapter } from '@infra/criptography/bcryptAdapter'
import { AccountMongoRepository } from '@infra/db/mongodb/accountRepository/accountMongoRepository'
import { LogMongoRepository } from '@infra/db/mongodb/logRepository/logMongoRepository'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const dbAddAccount = new DbAddAccount(new BcryptAdapter(), new AccountMongoRepository())

  return new LogControllerDecorator(
    new SignUpController(new EmailValidatorAdapter(), dbAddAccount),
    new LogMongoRepository()
  )
}
