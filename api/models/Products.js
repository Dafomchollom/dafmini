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
  type: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' },
    default: Date.now,
  },
})

module.exports = mongoose.model('Product', productSchema)
