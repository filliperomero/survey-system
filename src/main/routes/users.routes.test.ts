import request from 'supertest'

import { MongoHelper } from '@infra/db/mongodb/helpers/mongoHelper'
import app from '../config/app'

describe('Users Route', () => {
  beforeEach(async () => {
    await (await MongoHelper.getCollection('accounts')).deleteMany({})
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    it('should be able to return 200 on signup', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          name: 'Joe Doe',
          email: 'joe.doe@mail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })
})
