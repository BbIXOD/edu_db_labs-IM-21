import mysql2 from 'mysql2'
import * as globals from './globals.js'

export default mysql2.createConnection({
  host: globals.dbHost,
  user: globals.dbUser,
  database: globals.dbName
})