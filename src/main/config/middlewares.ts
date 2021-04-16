import { Express } from 'express'
import { bodyParser, serverCors, contentType } from '../middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(serverCors)
  app.use(contentType)
}
