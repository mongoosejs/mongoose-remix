import { createRouter } from 'remix/fetch-router'

import { assets } from './assets.ts'
import { routes } from './routes.ts'
import { deleteTodo } from './routes/todos.$id.delete.tsx'
import { toggleTodo } from './routes/todos.$id.toggle.tsx'
import { createTodo, getTodos, getTodosFrame } from './routes/todos.tsx'

export const router = createRouter()

router.get(routes.assets, async ({ request }) => {
  let response = await assets.fetch(request)
  return response ?? new Response('Not Found', { status: 404 })
})

router.get(routes.home, ({ request }) => Response.redirect(new URL('/todos', request.url)))
router.get(routes.todos, ({ request }) => getTodos(request))
router.get(routes.todosFrame, ({ request }) => getTodosFrame(request))
router.post(routes.createTodo, ({ request }) => createTodo(request))
router.post(routes.toggleTodo, ({ request, params }) => toggleTodo(request, params))
router.post(routes.deleteTodo, ({ request, params }) => deleteTodo(request, params))
