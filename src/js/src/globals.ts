import dotenv from 'dotenv'
import fastify from 'fastify'

dotenv.config()


export const app = fastify() //TODO: move to other file
export const port = Number(process.env.PORT) ?? 3000
export const dbHost = process.env.DB_HOST ?? 'localhost'
export const dbUser = process.env.DB_USER ?? 'root'
export const dbName = process.env.DB_NAME ?? 'db'
