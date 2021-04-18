import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Hasher,
  AddAccountRepository
} from './addAccountProtocols'

export class DbAddAccount implements AddAccount {
  constructor(private hasher: Hasher, private addAccountRepository: AddAccountRepository) {}

  async execute(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)

    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    )
    return account
  }
}
