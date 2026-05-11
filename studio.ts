import express from 'express'
import mongoose from 'mongoose'
import studio from '@mongoosejs/studio'

import './app/models/todo.ts'

const port = process.env.STUDIO_PORT ? Number.parseInt(process.env.STUDIO_PORT, 10) : 44101

const app = express()

app.use('/studio', await studio.express('/studio/api', mongoose))

const server = app.listen(port, () => {
  console.log(`Mongoose Studio listening on http://localhost:${port}/studio`)
})

server.on('error', (error) => {
  console.error(error)
  process.exit(1)
})

let shuttingDown = false

function shutdown() {
  if (shuttingDown) {
    return
  }

  shuttingDown = true
  server.close(() => {
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
