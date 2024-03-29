const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('rs2_auth_token')
  if (!token) return res.status(401).send('ACCESS DENIED')

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY)
    req.user = verified
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}
