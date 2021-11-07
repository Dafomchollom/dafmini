const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
dotenv.config()
// import routes here
const authRoute = require('./routes/auth')
const productRoute = require('./routes/products')

console.log(process.env.MONGOOSE_USERNAME, '::: user name:: ')
// connect to DB
mongoose.connect(
  `mongodb+srv://${process.env.MONGOOSE_USERNAME}:${process.env.MONGOOSE_PASSWORD}@dafapicluster0.rbjei.mongodb.net/rs2shopdatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (_err, res) => {
    // eslint-disable-next-line no-useless-catch
    try {
      console.log('Connected to Database')
    } catch (err) {
      throw err
    }
  }
)

app.use('/user', authRoute)
app.use('/product', productRoute)
app.get('/test', function (req, res) {
  res.send('Test successful')
})

export default {
  path: '/api',
  handler: app,
}
