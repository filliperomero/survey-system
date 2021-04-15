import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
  AddAccountRepository
} from './addAccountProtocols'

export class DbAddAccount implements AddAccount {
  constructor(private encrypter: Encrypter, private addAccountRepository: AddAccountRepository) {}

  async execute(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)

    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    )
    return account
  }
}
