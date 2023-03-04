
# node-express-sequelize-boilerplate

Basic Rest API node project

Including

- Jest and Supertest
- Eslint and Prettier
- Husky
- Logger : Winston and Morgan
- Express-Validator
- Middlewares: errorHandler, schemaValidator, urlNotFound
- Sequelize
- User and Roles management


# REST API

## Auth - Login
 VERB | URL |Params| Body | Description |
|--|--|--|--|--|
| POST | /api/v1/auth | --- |email : string <br>password : string |authenticates and returns a jwt token with user data and roles|


## Users
 VERB | URL |Params| Body | Description |
|--|--|--|--|--|
| GET | /api/v1/users | --- | ---|get all users|
| GET | /api/v1/users/:id | id: integer | ---|get user by id|
| POST | /api/v1/users | --- |firstName : string<br>lastName : string<br>email : string<br>password : string  |create user|
| POST | /api/v1/users/:id | id:integer |roles : Array[int]|add roles to user by role id|

## Roles
 VERB | URL |Params| Body | Description |
|--|--|--|--|--|
| GET | /api/v1/roles | --- | ---|get all roles|
| POST | /api/v1/roles | --- |name : string |create role|

## Status
 VERB | URL |Params| Body | Description |
|--|--|--|--|--|
| get | /api/v1/status | --- |---|returns status of the service|
