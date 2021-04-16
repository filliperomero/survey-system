import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/emailValidatorAdapter'
import { DbAddAccount } from '../../data/useCases/addAccount/dbAddAccount'
import { BcryptAdapter } from '../../infra/criptography/bcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/accountRepository/accountMongoRepository'

export const makeSignUpController = (): SignUpController => {
  const dbAddAccount = new DbAddAccount(new BcryptAdapter(), new AccountMongoRepository())

  return new SignUpController(new EmailValidatorAdapter(), dbAddAccount)
}
