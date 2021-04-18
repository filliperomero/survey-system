import { AccountMongoRepository } from './accountMongoRepository'
import { MongoHelper } from '../helpers/mongoHelper'
import { Collection } from 'mongodb'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection
describe('Account Mongo Repository', () => {
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should be able to return an account when calling add function', async () => {
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

  it('should be able to return an account when calling loadByEmail function', async () => {
    const sut = makeSut()

    await accountCollection.insertOne({
      name: 'joe doe',
      email: 'joe.doe@mail.com',
      password: 'any password'
    })

    const account = await sut.loadByEmail('joe.doe@mail.com')

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toEqual('joe doe')
    expect(account.email).toEqual('joe.doe@mail.com')
    expect(account.password).toEqual('any password')
  })

  it('should be able to return null when loadByEmail does not find an user', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('joe.doe@mail.com')

    expect(account).toBeFalsy()
  })
})
