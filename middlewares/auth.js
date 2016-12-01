'use strict'
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {

  let token = req.headers['authorization']

  if (!token) return res.status(401).json({error: 'Invalid token'})

  token = token.substring(7)

  let decoded = jwt.decode(token)

  if (!decoded || !decoded.sub) return res.status(401).json({error: 'Invalid token'})
  req.headers['x-account-id'] = decoded.sub
  next()
}
