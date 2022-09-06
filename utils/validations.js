const { body } = require('express-validator')

const loginValidator = [
  body('email', 'Email is not valid!').isEmail(),
  body('password', 'Password is not correct!').isLength({ min: 5 })
]

const registerValidator = [
  body('email', 'Email is not valid!').isEmail(),
  body('password', 'Password must be at least 5 characters!').isLength({ min: 5 }),
  body('fullName', 'Full Name must be at least 3 characters!').isLength({ min: 3 }),
  body('avatarURL', 'Avatar URL is must be URL!').optional().isURL()
]

const todoCreateValidator = [
  body('todo').isString().isLength({ min: 3 }),
  body('isComplete').isBoolean(),
  body('userID').isMongoId()
]

module.exports = {
  loginValidator,
  registerValidator,
  todoCreateValidator
}
