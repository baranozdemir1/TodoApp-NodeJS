const TodoModel = require('../models/Todo.js')

const getByUser = async (req, res) => {
  try {
    const userID = req.userID

    const todos = await TodoModel.find({ user: userID })

    return res.json(todos)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Server error!'
    })
  }
}

const getAll = async (req, res) => {
  try {
    const todos = await TodoModel.find().populate('user').exec()

    return res.json(todos)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Server error!'
    })
  }
}

const create = async (req, res) => {
  try {
    const doc = new TodoModel({
      todo: req.body.todo,
      isComplete: req.body.isComplete,
      user: req.userID
    })

    const checkTodo = await TodoModel.exists({ todo: req.body.todo, user: req.userID })

    if (checkTodo) {
      return res.status(409).json({
        message: 'Todo already exists!'
      })
    } else {
      const todo = await doc.save()

      return res.status(201).json({
        message: 'Todo added successfully!',
        todo
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Server error!'
    })
  }
}

const update = async (req, res) => {
  try {
    const todoID = req.params.id

    const checkUser = await TodoModel.exists({ _id: todoID, user: req.userID })

    if (checkUser) {
      await TodoModel.updateOne(
        {
          _id: todoID
        },
        {
          todo: req.body?.todo,
          isComplete: req.body?.isComplete,
          user: req.userID
        }
      )

      res.status(200).json({
        success: true
      })
    } else {
      return res.status(409).json({
        message: 'This user cannot edit this todo!'
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Server Error!'
    })
  }
}

const remove = async (req, res) => {
  try {
    const userID = req.userID

    const todoID = req.params.id

    await TodoModel.findOneAndDelete(
      {
        _id: todoID,
        user: userID
      },
      (err, doc) => {
        if (err) {
          console.error(err)
          return res.status(500).json({
            message: 'Something went wrong!'
          })
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Todo is not found!'
          })
        }

        res.json({
          success: true
        })
      }
    )
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Server Error!'
    })
  }
}

module.exports = {
  create,
  getByUser,
  update,
  remove,
  getAll
}
