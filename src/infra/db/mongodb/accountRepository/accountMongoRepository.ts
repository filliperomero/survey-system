import { LoadAccountByEmailRepository, AddAccountRepository } from '@data/protocols/db'
import { AccountModel } from '@domain/models/account'
import { AddAccountModel } from '@domain/useCases/addAccount'
import { MongoHelper } from '../helpers/mongoHelper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(accountData)

    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    const account = await accountCollection.findOne({ email })

    if (!account) return null

    return account && MongoHelper.map(account)
  }
}
