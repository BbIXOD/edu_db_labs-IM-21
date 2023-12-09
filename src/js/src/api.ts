import * as controllers from './controllers.js'
import * as schemas from './schemas.js'
import dbController from './dbController.js'
import { app, port } from './globals.js'

await dbController()
const connection = await app.mysql.getConnection()
console.log('connected to db')

app.addHook('onError', async (_request, reply, error) => {
  console.error(error)

  await reply.code(500).send({ message: error.message })
})

app.get('/', controllers.test)
app.get('/category', controllers.getCategory)
app.get('/category/:id', { schema: schemas.withId }, controllers.getCategoryByID)
app.post('/category', { schema: schemas.addNewCategory }, controllers.addNewCategory)
app.post('/category/extend', { schema: schemas.extendCategory }, controllers.extendCategory)
app.patch('/category/:id', { schema: schemas.modifyCategory }, controllers.modifyCategory)
app.delete('/category/:id', { schema: schemas.withId }, controllers.deleteCategory)

app.listen({ port }, () => console.log(`server is listening on port: ${port}`))

process.on('SIGINT', () => {
  connection.release()
  console.log('db disconected. shutting down server...')
  process.exit(0)
})
