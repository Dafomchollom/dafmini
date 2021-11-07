const mongoose = require('mongoose')

const productTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  description: {
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

module.exports = mongoose.model('ProductType', productTypeSchema)
