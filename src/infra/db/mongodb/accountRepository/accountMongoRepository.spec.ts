import { AccountMongoRepository } from './accountMongoRepository'
import { MongoHelper } from '../helpers/mongoHelper'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeEach(async () => {
    await (await MongoHelper.getCollection('accounts')).deleteMany({})
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should be able to return an account', async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: 'joe doe',
      email: 'joe.doe@mail.com',
      password: 'any password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toEqual('joe doe')
    expect(account.email).toEqual('joe.doe@mail.com')
    expect(account.password).toEqual('any password')
  })
})
