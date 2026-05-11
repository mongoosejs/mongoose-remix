import mongoose from 'mongoose'

import { Todo } from '../models/todo.ts'
import { actionComplete } from './todos.tsx'

export async function deleteTodo(request: Request, params: { id: string }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return actionComplete(request)
  }

  await Todo.findByIdAndDelete(params.id)

  return actionComplete(request)
}
