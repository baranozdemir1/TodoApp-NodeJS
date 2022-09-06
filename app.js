const express = require('express')
const mongoose = require('mongoose')
const { registerValidator, loginValidator, todoCreateValidator } = require('./utils/validations.js')
const checkAuth = require('./utils/checkAuth.js')
const cors = require('cors')

require('dotenv').config()

const { login, register, get } = require('./controllers/UserController.js')
const { create, getByUser, getAll, update, remove } = require('./controllers/TodoController.js')

mongoose
  .connect(process.env.MONGO_DB_CONNECT_LINK)
  .then(() => console.log('MongoDB is connected.'))
  .catch((error) => console.error(error))

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT, process.env.HOST, (error) => {
  if (error) {
    return console.error(error)
  }

  return console.log(`Server listening on http://${process.env.HOST}:${process.env.PORT}`)
})

app.post('/auth/login', loginValidator, login)
app.post('/auth/register', registerValidator, register)
app.get('/auth/me', checkAuth, get)

app.post('/todo/create', checkAuth, todoCreateValidator, create)
app.get('/todos', checkAuth, getByUser)
app.get('/getTodos', getAll)
app.patch('/todo/:id', checkAuth, update)
app.delete('/todo/:id', checkAuth, remove)
