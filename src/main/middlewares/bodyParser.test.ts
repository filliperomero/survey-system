import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  it('should be able to parse body as json', async () => {
    expect(true).toBeTruthy()
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Joe doe' })
      .expect({ name: 'Joe doe' })
  })
})
