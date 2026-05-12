import { Todo } from '../models/todo.ts'
import { render } from '../render.ts'
import { Document } from '../ui/document.tsx'
import { TodosFrame, TodosPage } from '../ui/todos-page.tsx'

export async function getTodos(request: Request) {
  return render(
    <Document title="Todos">
      <TodosPage />
    </Document>,
    request,
  )
}

export async function getTodosFrame(request: Request) {
  const todos = await Todo.find().sort({ createdAt: -1 }).lean()

  return render(<TodosFrame todos={todos} />, request)
}

export async function createTodo(request: Request) {
  try {
    const formData = await request.formData()
    const title = String(formData.get('title') || '').trim()

    if (title) {
      await Todo.create({ title })
    }

    return actionComplete(request)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return actionError(request, message)
  }
}

export function actionComplete(request: Request) {
  if (request.headers.has('x-remix-frame-action')) {
    return new Response(null, { status: 204 })
  }

  return Response.redirect(new URL('/todos', request.url))
}

export function actionError(request: Request, message: string, status = 500) {
  if (request.headers.has('x-remix-frame-action')) {
    return new Response(message, {
      status,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  }

  return new Response(message, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
