import { Express } from 'express'
import { bodyParser } from '../middlewares/bodyParser'
import { serverCors } from '../middlewares/cors'
import { contentType } from '../middlewares/contentType'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(serverCors)
  app.use(contentType)
}
