# Storefront Backend Project
# Bookstore
## Powered By 

![](https://d20vrrgs8k4bvw.cloudfront.net/images/open-graph/udacity.png)

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm i` in your terminal at the project root.

## Project Folder Contents
### STOREFRONT_BACKEND
  * dist
  * migrations
    - sqls
        * 20220312021256-books-table-down
        * 20220312021256-books-table-up
        * 20220312021550-users-table-down
        * 20220312021550-users-table-up
        * 20220312024615-orders-table-down
        * 20220312024615-orders-table-up
        * 20220312024630-orders-books-table-down
        * 20220312024630-orders-books-table-up
    - 20220312021256-books-table
    - 20220312021550-users-table
    - 20220312024615-orders-table
    - 20220312024630-orders-books-table
  * node_modules
  * spec
    - support
        * jasmine.json
  * src
    -handlers
        * book.ts
        * dashboard.ts
        * order_book.ts
        * order.ts
        * user.ts
    - middlewares
        * authentication.ts
    - models
        * book.ts
        * order_book.ts
        * order.ts
        * user.ts
    - routes
        * api
            - book.ts
            - dashboard.ts
            - order_book.ts
            - order.ts
            - user.ts
        * routes.ts
    - services
        * dashboard.ts
    - tests
        * handlers
            - bookSpec.ts
            - dashboardSpec.ts
            - order_bookSpec.ts
            - orderSpec.ts
            - userSpec.ts
        * helpers
            - reporter.ts
        * models
            - bookSpec.ts
            - order_bookSpec.ts
            - orderSpec.ts
            - userSpec.ts
        * rotues
            - API
                * bookSpec.ts
                * dashboardSpec.ts
                * order_bookSpec.ts
                * orderSpec.ts
                * userSpec.ts
            - routesSpec.ts
        * services
            - dashboardSpec.ts
        * databaseSpec.ts
        * serverSpec.ts
    - database.ts
    - server.ts
  * .env
  * .eslintignore
  * .eslintrc
  * .gitignore
  * .prettierignore
  * .prettierrc
  * database.json
  * LICENSE
  * package-lock.json
  * package.json
  * README.md
  * REQUIREMENTS.md
  * tsconfig.json

## project tools and frameworks
    this api has been done using **TypeScript** & **NodeJS** & **ExpressJS** & **PostgresSQL**
  - [NodeJS](https://nodejs.org/en/) - an asynchronous event-driven JavaScript runtime
  - [Express](https://expressjs.com/) - back end web application framework for Node.js.
  - [TypeScript](https://www.typescriptlang.org/) - coding language developed as a superset of JavaScript.
  - [PostgresSQL](https://www.postgresql.org/) - Database management system(DBMS).
## Instructions

  To run the site you need to run it on your localhost server by downloading node.js from [here](https://nodejs.org/en/) and you need to write on terminal the following codes:

## installation and running


1. Clone the project `git clone https://github.com/MaSMas0/Storefront_Backend.git`.

2. to install dependencies you need to write `npm i`(https://docs.npmjs.com/downloading-and-installing-packages-locally).

3. Install postgres on your local machine from this [link](https://www.postgresql.org/download/).
4. Terminal and write the following code `psql -U postgres` 
5. in the SQL SHELL please write the following SQL commands

 /** DEV database **/
 ```sql
CREATE DATABASE udacity_storefront_dev;
```
/** Test database **/
```sql
CREATE DATABASE udacity_storefront_test;
```
6. you have to setup db-migrate globally in order to use it in commandline directly
7. run the migration up to migrate the tables to the dev database using the following cli
`db-migrate up` 

8. make a file .env and you can copy the following env variables

```env
PORT= 2784
ENV='dev'
POSTGRES_HOST = '127.0.0.1'
POSTGRES_DB = 'book_store_dev'
POSTGRES_TEST_DB = 'book_store_test'
POSTGRES_USER = 'postgres'
POSTGRES_PASSWORD = 'password123'       > you can put whatever password you have for the postgres in ur machine
POSTGRES_PORT = '5432'
BCRYPT_PASSWORD = 'your-unlucky-day'
SALT_ROUNDS = '10'
TOKEN_SECRET = 'love'
BEARER_TOKEN_TEST= 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJ1c2VybmFtZSI6ImFybWluIiwiZW1haWwiOiJhcm1pbkBlbGRpYS5jb20iLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkaEZRZWl3emxYakw0a0VVSXdwc2JsdUxuMy9JTUFxZkMySTJuYUxFekVZWFFsbUF5Uy4yWnkifSwiaWF0IjoxNjQ3ODQ0Mjk3fQ.06lRruDK8AMqwqtFJLRrtNvTfLsA3iEAN5uHjuQT2ss'
```

9. to transpile the typeScript codes into JavaScript codes and save them in the `./dist` folder.
use the following cli `npm run build`


10.   **to start the server running on port `2784`.**   `npm run start`

                | **Database Port** | **Server Port** |
                |      :----:       |      :----:     |
                |       5432        |       2784      |


## Testing , formating and Linting

11. to lint you need to write the following code : `npm run lint`
12. to formate you need to write the following code : `npm run prettier`
13. to test on the test database you will need to write the following code: `npm run test`

## APIs EndPoints

For more information about APIs Endpoints click here => [REQUIREMENTS](./REQUIREMENTS.md)

**Please note that the version of dependencies is mentioned in package.json**

### Contact Info for Programmer
* Name: _Mohamed Abd El-Samie Ahmad Mansour_
* Email: mmansour92@icloud.com  
