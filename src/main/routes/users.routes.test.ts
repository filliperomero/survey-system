import request from 'supertest'
import { hash } from 'bcrypt'

import { MongoHelper } from '@infra/db/mongodb/helpers/mongoHelper'
import app from '../config/app'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('Users Route', () => {
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

  describe('POST /login', () => {
    it('should be able to return 200 on login', async () => {
      const password = await hash('123456', 12)

      await accountCollection.insertOne({
        name: 'Joe Doe',
        email: 'joe.doe@mail.com',
        password
      })

      await request(app)
        .post('/api/users/login')
        .send({
          email: 'joe.doe@mail.com',
          password: '123456'
        })
        .expect(200)
    })

    it('should be able to return 401 on login', async () => {
      await request(app)
        .post('/api/users/login')
        .send({
          email: 'joe.doe@mail.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
