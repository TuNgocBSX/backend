/* eslint-disable no-path-concat */
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const numberRouter = require('./routes/number')
const cors = require('cors')
dotenv.config()
mongoose.connect(
  process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
  },
  (err) => {
    if (err) console.log(err)
    else console.log('Connect to DB Success!')
  })
// đăng kí một số option
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({
  extended: false
}))
app.use('/api', numberRouter)
app.listen(process.env.PORT, (err) => {
    if (err) console.log(err)
    else console.log('Connected Sever',process.env.PORT)
  })