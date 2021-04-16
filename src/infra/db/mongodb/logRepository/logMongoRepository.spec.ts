import { Collection } from 'mongodb'

import { LogMongoRepository } from './logMongoRepository'
import { MongoHelper } from '../helpers/mongoHelper'

describe('Log Mongo Repository', () => {
  let errorCollection: Collection

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should be able to', async () => {
    const sut = new LogMongoRepository()

    await sut.logError('any_error')

    const count = await errorCollection.countDocuments()

    expect(count).toBe(1)
  })
})
