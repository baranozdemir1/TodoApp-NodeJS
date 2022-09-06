const UserModel = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({ message: 'User not found!' })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user._doc.password)

    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Password is not valid!' })
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      'secret1234',
      {
        expiresIn: '1h'
      }
    )

    const { password, ...userData } = user._doc

    return res.json({
      message: 'User logged in successfully!',
      user: userData,
      token
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error!' })
  }
}

const register = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const purePassword = req.body.password
    const hashSalt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(purePassword, hashSalt)

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarURL: req.body?.avatarURL,
      password: passwordHash
    })

    let saveError = {}

    const user = await doc.save().then((user) => user).catch((error) => {
      saveError = error
    })

    const { password, ...userData } = user._doc

    const token = jwt.sign({ _id: user._id }, 'secret1234', { expiresIn: '1h' })

    if (Object.keys(saveError).length === 0) {
      return res.status(201).json({
        message: 'User created successfully!',
        user: userData,
        token
      })
    } else {
      return res.status(409).json({
        message: 'User already exists!',
        error: saveError
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error
    })
  }
}

const get = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userID)

    if (!user) {
      return res.status(404).json({ message: 'User not found!' })
    }
    const { password, ...userData } = user._doc

    return res.json({
      message: 'User found!',
      user: userData
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  login,
  register,
  get
}
