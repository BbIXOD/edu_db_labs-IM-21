# Реалізація інформаційного та програмного забезпечення

В рамках проекту розробляється:
- RESTfull сервіс для управління даними

## SQL-Скрипт для створення початкового наповнення бази даних
```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Organization_list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Organization_list` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Organization_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `list_of_organizations` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Role` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`User` ;

CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `Organization_list_id` INT NOT NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Organization_list_id`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE,
  INDEX `fk_User_Organization_list1_idx` (`Organization_list_id` ASC) VISIBLE,
  INDEX `fk_User_Role1_idx` (`Role_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_Organization_list1`
    FOREIGN KEY (`Organization_list_id`)
    REFERENCES `mydb`.`Organization_list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `mydb`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Rating` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Rating` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `value` FLOAT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Data`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Data` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Data` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `size` VARCHAR(45) NOT NULL,
  `format` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `uploadedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Post` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `uploadedAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `Rating_id` INT NOT NULL,
  `Data_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Rating_id`, `Data_id`),
  INDEX `fk_Post_Rating1_idx` (`Rating_id` ASC) VISIBLE,
  INDEX `fk_Post_Data1_idx` (`Data_id` ASC) VISIBLE,
  CONSTRAINT `fk_Post_Rating1`
    FOREIGN KEY (`Rating_id`)
    REFERENCES `mydb`.`Rating` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Post_Data1`
    FOREIGN KEY (`Data_id`)
    REFERENCES `mydb`.`Data` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Access` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Access` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `time` DATETIME NOT NULL,
  `User_id` INT NOT NULL,
  `Post_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Access_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Access_Post1_idx` (`Post_id` ASC) VISIBLE,
  CONSTRAINT `fk_Access_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Access_Post1`
    FOREIGN KEY (`Post_id`)
    REFERENCES `mydb`.`Post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Category` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `Category_id` INT NOT NULL,
  `Post_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Post_id`, `Category_id`),
  INDEX `fk_Category_Post1_idx` (`Post_id` ASC) VISIBLE,
  CONSTRAINT `fk_Category_Post1`
    FOREIGN KEY (`Post_id`)
    REFERENCES `mydb`.`Post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Permission`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Permission` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Permission_has_Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Permission_has_Role` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Permission_has_Role` (
  `Permission_id` INT NOT NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`Permission_id`, `Role_id`),
  INDEX `fk_Permission_has_Role_Role1_idx` (`Role_id` ASC) VISIBLE,
  INDEX `fk_Permission_has_Role_Permission1_idx` (`Permission_id` ASC) VISIBLE,
  CONSTRAINT `fk_Permission_has_Role_Permission1`
    FOREIGN KEY (`Permission_id`)
    REFERENCES `mydb`.`Permission` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Permission_has_Role_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `mydb`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Organizations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Organizations` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Organizations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Organization_list_has_Organizations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Organization_list_has_Organizations` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Organization_list_has_Organizations` (
  `Organization_list_id` INT NOT NULL,
  `Organizations_id` INT NOT NULL,
  PRIMARY KEY (`Organization_list_id`, `Organizations_id`),
  INDEX `fk_Organization_list_has_Organizations_Organizations1_idx` (`Organizations_id` ASC) VISIBLE,
  INDEX `fk_Organization_list_has_Organizations_Organization_list1_idx` (`Organization_list_id` ASC) VISIBLE,
  CONSTRAINT `fk_Organization_list_has_Organizations_Organization_list1`
    FOREIGN KEY (`Organization_list_id`)
    REFERENCES `mydb`.`Organization_list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Organization_list_has_Organizations_Organizations1`
    FOREIGN KEY (`Organizations_id`)
    REFERENCES `mydb`.`Organizations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

--  Inserting Permissions, that roles can own --
Insert Into mydb.permission (name) VALUES
	('Create'),
    ('Edit'),
    ('Delete'),
    ('Execute');

-- Inserting Roles --
Insert into `mydb`.`role` (name, description) VALUES
	('sadmin', 'System Administrator'),
    ('Developer', 'System Developer'),
    ('Moderator', 'Moderator'),
    ('User', 'User');


-- Correlating Roles with Permissions --
Insert into mydb.permission_has_role (Role_id, Permission_id) VALUES
	(1, 1),
    (1, 2),
    (1, 3),
	(2, 1),
    (2, 2),
    (2, 3),
    (2, 4),
    (3, 1),
    (3, 3);

-- Creating Organizations list for new Users --
Insert Into mydb.organization_list (list_of_organizations) Values
	('user1_login'),
    ('user2_login'),
    ('user3_login'),
    ('user4_login');

-- Creating new Users with org.list id from prev action and role id --
Insert into mydb.user (login, password, mail, name, Organization_list_id, Role_id) Values
	('user1_login', 'qwerty123', 'user1_login@gamil.com', 'User 1', 1, 1),
    ('user2_login', 'qwerty123', 'user2_login@gamil.com', 'User 2', 2, 2),
    ('user3_login', 'qwerty123', 'user3_login@gamil.com', 'User 3', 3, 3),
    ('user4_login', 'qwerty123', 'user4_login@gamil.com', 'User 4', 4, 4);

-- Creating organizations --
Insert into mydb.organizations (name, description) Values
	('Organization A', 'Provides some goods for A Group'),
    ('Organization B', 'Provides some goods for B Group'),
    ('Organization C', 'Provides some goods for C Group');

-- Inserting organizations into user's org.list --
Insert into mydb.organization_list_has_organizations
	(Organization_list_id, Organizations_id)
    Values
	(1, 3),
    (1, 2),
    (1, 1),
    (2, 1),
    (2, 2),
    (3, 1),
    (4, 2);

-- Inserting data info before post creating --
Insert Into mydb.data (size, format, name, uploadedAt) Values
	('2.5mb', 'png', 'png1', '2023-11-16'),
    ('3.1mb', 'png', 'png2', '2023-11-16'),
    ('1.7mb', 'png', 'png3', '2023-11-16');

-- Inserting Def. rating for each post --
Insert into mydb.rating (value) Values
	(0.0),
    (0.0),
    (0.0);


-- Creating Post --
Insert into mydb.post
	(
		name, title, description, uploadedAt, updatedAt, Rating_id, Data_id
	) Values
	(
		'first Post', 'Usage of DB1', 'lorem ipsum Description', '2023-11-16', '2023-11-16', 1, 1
    ),
    (
		'Second Post', 'Usage of DB2', 'lorem ipsum Description', '2023-11-16', '2023-11-16', 2, 2
    ),
    (
		'Third Post', 'Usage of DB3', 'lorem ipsum Description', '2023-11-16', '2023-11-16', 3, 3
    );

-- Adding Access info for each post and specific users --
Insert into mydb.access (time, User_id, Post_id) Values
	('2023-11-16', 1, 1),
    ('2023-11-16', 1, 2),
    ('2023-11-16', 3, 3);

-- Correlating Categories with posts --
Insert into mydb.category (name, description, Post_id, Category_id) Values
	('Abstract cat name1', 'abc description', 1, 1),
	('Abstract cat name1', 'abc description', 2, 1),
	('Abstract cat name2', 'abc description', 3, 2);
```


## RESTfull Сервіс для управління даними

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
