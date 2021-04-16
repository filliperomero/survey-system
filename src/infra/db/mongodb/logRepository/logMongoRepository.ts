import { LogErrorRepository } from '../../../../data/protocols/logErrorRepository'
import { MongoHelper } from '../helpers/mongoHelper'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    await (await MongoHelper.getCollection('errors')).insertOne({
      stack,
      data: new Date()
    })
  }
}
