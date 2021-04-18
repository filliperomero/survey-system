export default {
  mongoUrl:
    process.env.MONGO_URL ||
    'mongodb://root:password@localhost:27017/survey-system?authSource=admin',
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'd41d8cd98f00b204e9800998ecf8427e'
}
