import { serve } from 'remix/node-serve'

import './app/models/todo.ts'
import { router } from './app/router.ts'

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 44100

const server = serve(
  async (request) => {
    try {
      return await router.fetch(request)
    } catch (error) {
      console.error(error)
      const message =
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : error instanceof Error
            ? `${error.name}: ${error.message}`
            : String(error)
      return new Response(message, {
        status: 500,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      })
    }
  },
  {
    port,
  },
)

await server.ready
console.log(`Server listening on http://localhost:${server.port}`)

let shuttingDown = false

function shutdown() {
  if (shuttingDown) {
    return
  }

  shuttingDown = true
  server.close()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
