export default {
  mongoUrl:
    process.env.MONGO_URL ||
    'mongodb://root:password@localhost:27017/survey-system?authSource=admin',
  port: process.env.PORT || 3333
}
