import mongoose, { Schema } from 'mongoose'
import '../db/connect.ts'

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    status: {
      type: String,
      enum: ['created', 'done'],
      default: 'created',
    },
  },
  {
    timestamps: true,
  },
)

export const Todo = mongoose.model('Todo', todoSchema)
