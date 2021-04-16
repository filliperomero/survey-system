import { MongoHelper as sut } from './mongoHelper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  it('should be able to reconnect if mongodb went down', async () => {
    let accountCollection = await sut.getCollection('accounts')

    expect(accountCollection).toBeTruthy()

    await sut.disconnect()

    accountCollection = await sut.getCollection('accounts')

    expect(accountCollection).toBeTruthy()
  })
})
