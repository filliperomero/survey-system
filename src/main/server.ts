import env from './config/env'
import { MongoHelper } from '@infra/db/mongodb/helpers/mongoHelper'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default

    app.listen(env.port, () => console.log(`🟢 Server running on port: ${env.port} ✔`))
  })
  .catch(console.error)
