import { Todo } from '../models/todo.ts'
import { actionComplete, actionError } from './todos.tsx'

export async function deleteTodo(request: Request, params: { id: string }) {
  try {
    await Todo.deleteOne({ _id: params.id }).orFail()
    return actionComplete(request)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return actionError(request, message)
  }
}
