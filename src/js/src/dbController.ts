import fsql from '@fastify/mysql'
import { app, dbHost, dbUser, dbName } from './globals.js'

export default () => app.register(fsql, {
  host: dbHost,
  user: dbUser,
  database: dbName,
  promise: true
})