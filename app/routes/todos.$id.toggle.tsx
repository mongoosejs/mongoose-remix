import mongoose from 'mongoose'

import { Todo } from '../models/todo.ts'
import { actionComplete } from './todos.tsx'

export async function toggleTodo(request: Request, params: { id: string }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return actionComplete(request)
  }

  const todo = await Todo.findById(params.id)

  if (todo) {
    todo.status = todo.status === 'done' ? 'created' : 'done'
    await todo.save()
  }

  return actionComplete(request)
}
