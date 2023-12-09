import { FastifyRequest, FastifyReply } from 'fastify'
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