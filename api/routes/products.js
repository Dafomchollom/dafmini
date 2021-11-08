const router = require('express').Router()
const Joi = require('joi')

const ProductType = require('../models/ProductType')
const Product = require('../models/Products')
const Cart = require('../models/Cart')

// product type validation schema
const productTypeSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
})

// product validation schema
const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  productType: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
})

// cart validation for multiple items
const cartSchema = Joi.object({
  userID: Joi.string().required(),
  itemsBought: Joi.array().required(),
})

// productType
router.post('/productType', async (req, res) => {
  // validate data for errors
  const { error } = productTypeSchema.validate(req.body)
  if (error) return res.status(400).send({ message: error.details[0].message })

  //   deconstruct request body
  const { name, description } = req.body

  //   check if product type exist
  const productTypeExist = await ProductType.findOne({ name })
  if (productTypeExist)
    return res.status(400).send({ message: 'Product Type Exist already' })

  const prodType = new ProductType({
    name,
    description,
  })
  try {
    //   save product type
    const savedProductType = await prodType.save()
    // send response to user
    res.status(200).send(savedProductType)
  } catch (err) {
    res.status(400).send(err)
  }
})

// get productType
router.get('/productType', async (req, res) => {
  try {
    //   save product type
    const products = await ProductType.find()
    // send response to user
    res.status(200).send(products)
  } catch (err) {
    res.status(400).send(err)
  }
})

// create product
router.post('/', async (req, res) => {
  // validate data for errors
  const { error } = productSchema.validate(req.body)
  if (error) return res.status(400).send({ message: error.details[0].message })

  //   deconstruct request body
  const { name, description, productType, image, price } = req.body

  //   check if product type exist
  const productTypeExist = await ProductType.findOne({ _id: productType })
  if (!productTypeExist)
    return res.status(400).send({ message: 'Product Type Does not Exist' })

  //   check if product type exist
  const productExist = await ProductType.findOne({ name })
  if (productExist)
    return res.status(400).send({ message: 'Product Exist already' })

  const product = new Product({
    name,
    description,
    productType,
    image,
    price,
  })
  try {
    //   save product
    const savedProduct = await product.save()
    // send response to user
    res.status(200).send(savedProduct)
  } catch (err) {
    res.status(400).send(err)
  }
})

// get product by category
router.get('/', async (req, res) => {
  const { productType, productName } = req.query
  try {
    //   save product type
    const products =
      productType && productName
        ? await Product.find({
            productType,
            productName,
          })
        : productType && !productName
        ? await Product.find({
            productType,
          })
        : await Product.find()
    // send response to user
    res.status(200).send(products)
  } catch (err) {
    res.status(400).send(err)
  }
})

// buy items
router.post('/buyproducts', async (req, res) => {
  // validate data for errors
  const { error } = cartSchema.validate(req.body)
  if (error) return res.status(400).send({ message: error.details[0].message })

  //   deconstruct request body
  const { userID, itemsBought } = req.body

  // get all new items user wants to buy
  const newItems = itemsBought.map((item) => item.productId)

  // check if user has bought item

  const user = await Cart.find({ userID })

  // get all products that user has bought
  const userCartHistory = user.map((item) =>
    item.itemsBought.map((item) => item.productId).concat()
  )

  // loop through and find if user has bought a product before
  newItems.forEach((item) => {
    if (userCartHistory.includes(item))
      return res
        .status(400)
        .send({ message: `you have bought the this product before` })
  })

  const cart = new Cart({
    userID,
    itemsBought,
  })
  try {
    //   save cart
    const savedProduct = await cart.save()
    // send response to user
    res.status(200).send({ savedProduct, userCartHistory })
  } catch (err) {
    res.status(400).send(err)
  }
})
module.exports = router
