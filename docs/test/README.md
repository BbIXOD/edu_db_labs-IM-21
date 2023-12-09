# Тестування працездатності системи

## Засоби тестування
Було створено API, що підключається до бази даних і виконує дії з таблицею категорій. Для цього було обрано фреймворк Fastify і мову програмування Typescript. Використано CRUD.

### Запуск
Потрібно створити користувача бази даних user без паролю й надати йому доступ.
Далі, просто заходимо в папку `src\js` і запускаємо скрипт `npm run start`. Він сам прочитає й виконає файл бази даних, скомпілює проєкт і запустить його.
Примітки:
+перевірте наявність модулів. у разі відсутності виконайте `node install`.
+не переймайтесь за час компіляції. єсбілд набагато швидший за виконання `tsc`

## Код програми
### `api.ts`
Серце програми, де, власне, відбувається прив'язка контроллерів і загалом програма збирається докупи.
```
import * as controllers from './controllers.js'
import * as schemas from './schemas.js'
import dbController from './dbController.js'
import { app, port } from './globals.js'

await dbController()
const connection = await app.mysql.getConnection() // підключаємось до бази лише один раз при запуску
console.log('connected to db')

app.addHook('onError', async (_request, reply, error) => { // кастомний обробник помилок
  console.error(error)

  reply.code(500).send({ message: error.message })
})

// додаємо шляхи
app.get('/', controllers.test) //просто щоб перевірити чи підключається до дб й чи надсилається відповідь. дуже схожий на наступний метод
app.get('/category', controllers.getCategory) // отримуємо всі категорії
app.get('/category/:id', { schema: schemas.withId }, controllers.getCategoryByID) // отримуємо категорію по id якщо така існує
app.post('/category', { schema: schemas.addNewCategory }, controllers.addNewCategory) // додаємо нову категорію, якої ще не існувало
app.post('/category/extend', { schema: schemas.extendCategory }, controllers.extendCategory) // category в нас, м'яко кажучи, специфічний. тому існує
                                                                                             // окремий метод коли ми посилаємось вже на існуючу категорію
app.patch('/category/:id', { schema: schemas.modifyCategory }, controllers.modifyCategory) // змінюємо існуючу категорію
app.delete('/category/:id', { schema: schemas.withId }, controllers.deleteCategory) // видаляємо категорію

app.listen({ port }, () => console.log(`server is listening on port: ${ port }`))

process.on('SIGINT', async () => { //перед вимкненням сервера треба від'єднати базу даних
  connection.release();
  console.log('db disconected. shutting down server...')
  process.exit(0);
});
```

### `controllers.ts`
Тут зберігаються всі ті калбеки, що ми прив'язуємо до роутів.
```
import { FastifyRequest, FastifyReply } from 'fastify' // тут все крім app це просто типи. особливість ts.
import { app } from './globals.js'
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise'

export const test = async (request: FastifyRequest, reply: FastifyReply) => {
    const [result] = await app.mysql.query('SELECT * FROM category');
    return 'ok'
}

export const getCategory = async (_request: FastifyRequest, reply: FastifyReply) => {
  const result = await app.mysql.query('SELECT * FROM category')

  return result[0]
}

export const getCategoryByID = async (request: FastifyRequest, reply: FastifyReply) => {
  const id = (request.params as { id: string }).id
  const dbReply  = await app.mysql.query('SELECT * FROM category WHERE id = ?', [id])

  return dbReply[0]
}

export const addNewCategory = async (request: FastifyRequest, reply: FastifyReply) => {
  const rowsFieldWithMaxId = 'MAX(Category_id)'

  const { name, description, postId } = request.body as { name: string, description: string, postId: string }

  const [rows] = await app.mysql.query('SELECT MAX(Category_id) FROM category')
  const categoryId = (rows as [{ [rowsFieldWithMaxId]: number }])[0][rowsFieldWithMaxId] + 1
  await app.mysql
    .query('INSERT INTO category (name, description, Post_id, Category_id) VALUES (?, ?, ?, ?) ',
      [name, description, postId, categoryId])

  return "Category added successfully"
}

export const extendCategory = async (request: FastifyRequest, reply: FastifyReply) => {
  const { postId, categoryId } = request.body as { postId: string, categoryId: string }

  const result = await app.mysql
    .execute('SELECT name, description FROM category WHERE id = ? LIMIT 1', [categoryId]) as RowDataPacket[][]
  
  if (result[0].length === 0) {
    return reply.code(404).send('Category not found')
  }
    
  const { name, description } =(result[0] as [ { name: string, description: string}])[0]

  await app.mysql
    .execute('INSERT INTO category (name, description, Post_id, Category_id) VALUES (?, ?, ?, ?)',
      [name, description, postId, categoryId])

  return "Category extended successfully"
}

export const deleteCategory = async (request: FastifyRequest, reply: FastifyReply) => {
  const id = (request.params as { id: string }).id

  const result = await app.mysql
    .execute('DELETE FROM category WHERE id = ?', [id]) as ResultSetHeader[]
  
  if (result[0].affectedRows === 0) return reply.code(404).send("Category not found")
  return "Category deleted successfully"
}

export const modifyCategory = async (request: FastifyRequest, reply: FastifyReply) => {
  const id = (request.params as { id: string }).id
  const { name, description } = request.body as { name: string, description: string }

  const result = await app.mysql
    .execute('UPDATE category SET name = ?, description = ? WHERE id = ?', [name, description, id]) as ResultSetHeader[]
    
  if (result[0].affectedRows === 0) reply.code(404).send("Category not found")
  return "Category modified successfully"
}
```
## `dbController.ts`
Створює підключення до бази даних.
```
import fsql from '@fastify/mysql' // знову ж типи
import { app, dbHost, dbUser, dbName } from './globals.js'

export default () => app.register(fsql, {
  host: dbHost,
  user: dbUser,
  database: dbName,
  promise: true
})
```
## `globals.ts`
Зроблений для спільного доступу до глобальних даних і використання лише одного об'єкта fastify а не різних.
```
import dotenv from 'dotenv'
import fastify from 'fastify'

dotenv.config()


export const app = fastify() // чи потрібно перемістити це в інший файл
export const port = Number(process.env.PORT) ?? 3000 // намагаємось отримати змінну з оточення або підставляємо дефолтне значення
export const dbHost = process.env.DB_HOST ?? 'localhost'
export const dbUser = process.env.DB_USER ?? 'root'
export const dbName = process.env.DB_NAME ?? 'db'
```
## `interfaces.ts`
Теж файл тільки для типів. Вимога при використанні плагіна `@fastify/mysql`
```
import { MySQLPromisePool } from '@fastify/mysql'

declare module 'fastify' {
  interface FastifyInstance {
    mysql: MySQLPromisePool 
  }
}
```

## `schemas.ts`
Схеми для валідації запитів. Тобто, нам не потрібно в контроллерах перевіряти чи є таке поле в тілі запиту. fastify зробить все сам.
```
import exp from "constants"

export const addNewCategory = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      postId: { type: 'string' }
    },
    required: ['name', 'description', 'postId']
  }
}

export const extendCategory = {
  body: {
    type: 'object',
    properties: {
      postId: { type: 'string' },
      categoryId: { type: 'string' }
    },
    required: ['postId', 'categoryId']
  }
}

export const withId = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  }
}

export const modifyCategory = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' }
    },
    required: ['name', 'description']
  }
}
```
