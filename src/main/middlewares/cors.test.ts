import request from 'supertest'
import app from '../config/app'

describe('CORS middleware', () => {
  it('should be able to enable CORS', async () => {
    expect(true).toBeTruthy()
    app.post('/test_cors', (req, res) => {
      res.send()
    })

    await request(app).get('/test_cors').expect('access-control-allow-origin', '*')
  })
})
