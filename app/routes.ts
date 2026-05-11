import { get, post, route } from 'remix/fetch-router/routes'

export const routes = route({
  assets: get('/assets/*path'),
  home: get('/'),
  todos: get('/todos'),
  todosFrame: get('/todos/frame'),
  createTodo: post('/todos'),
  toggleTodo: post('/todos/:id/toggle'),
  deleteTodo: post('/todos/:id/delete'),
})
