import request from 'supertest'
import app from '../config/app'

describe('Signup Route', () => {
  it('should be able to return an account', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Joe Doe',
        email: 'joe.doe@mail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
