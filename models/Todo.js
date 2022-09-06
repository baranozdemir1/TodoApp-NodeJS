const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true
    },
    isComplete: {
      type: Boolean,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Todo', TodoSchema)
