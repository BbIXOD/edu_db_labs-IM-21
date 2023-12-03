import fastify from 'fastify'
import { getCategory } from './controllers'
import { port } from './globals.js'

const app = fastify()

app.get('/category', getCategory)

app.listen({ port }, () => console.log(`server listening on port ${port}`))
