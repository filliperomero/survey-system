import app from './config/app'

app.listen(process.env.PORT || 3333, () =>
  console.log(`Server running at port ${process.env.PORT || 3333}`)
)
