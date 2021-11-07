const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 32,
  },
  description: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  productType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductType',
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0.0,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Product', productSchema)
