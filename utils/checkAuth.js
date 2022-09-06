const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
      try {
        const decoded = jwt.verify(token, 'secret1234')
        req.userID = decoded._id
      } catch (error) {
        return res.status(403).json({ message: 'Invalid token!' })
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized!' })
    }
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed!'
    })
  }
}

module.exports = checkAuth
