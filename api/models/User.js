const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  loginName: {
    type: String,
    required: true,
    min: 5,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', userSchema)
