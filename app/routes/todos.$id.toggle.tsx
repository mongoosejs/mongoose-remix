import { Todo } from '../models/todo.ts'
import { actionComplete, actionError } from './todos.tsx'

export async function toggleTodo(request: Request, params: { id: string }) {
  try {
    const todo = await Todo.findById(params.id).orFail()

    if (todo.status === 'created') {
      todo.status = 'done'
    } else if (todo.status === 'done') {
      todo.status = 'created'
    }

    await todo.save()

    return actionComplete(request)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return actionError(request, message)
  }
}
