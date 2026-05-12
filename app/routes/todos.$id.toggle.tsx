import { Todo } from '../models/todo.ts'
import { actionComplete, actionError } from './todos.tsx'

export async function toggleTodo(request: Request, params: { id: string }) {
  try {
    const formData = await request.formData()
    const status = formData.get('status')

    const todo = await Todo.findById(params.id).orFail()
    // @ts-ignore
    todo.status = status

    await todo.save()

    return actionComplete(request)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return actionError(request, message)
  }
}
