const router = require('express').Router()
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
// register validation schema
const registerSchema = Joi.object({
  loginName: Joi.string().min(5).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).max(20).required(),
})

// login validation schema
const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).max(20).required(),
})
// create user route
router.post('/register', async (req, res) => {
  // validate data for errors
  const { error } = registerSchema.validate(req.body)
  if (error) return res.status(400).send({ message: error.details[0].message })

  //   deconstruct request body
  const { loginName, email, password } = req.body

  //   check if user exist
  const emailExist = await User.findOne({ email })
  if (emailExist) return res.status(400).send({ message: 'User already exist' })

  //   hash password
  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(password, salt)
  const user = new User({
    loginName,
    email,
    password: hashedPassword,
  })
  try {
    //   save user
    const savedUser = await user.save()
    // send response to user
    res.status(200).send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
})

// log in
router.post('/login', async (req, res) => {
  // validate data for errors
  const { error } = loginSchema.validate(req.body)
  if (error) return res.status(400).send({ message: error.details[0].message })

  //   deconstruct request body
  const { email, password } = req.body

  //   check if user exist
  const userExist = await User.findOne({ email })
  if (!userExist)
    return res.status(400).send({ message: 'Email or password is Wrong' })

  //   compare password
  const validPass = await bcrypt.compare(password, userExist.password)

  if (!validPass)
    return res.status(400).send({ message: 'Email or password is Wrong' })

  // create jwt token
  const token = jwt.sign(
    { email: userExist.email, loginName: userExist.loginName },
    process.env.TOKEN_KEY
  )
  res.status(200).send({
    email: userExist.email,
    loginName: userExist.loginName,
    _id: userExist._id,
    token,
  })
})

module.exports = router
