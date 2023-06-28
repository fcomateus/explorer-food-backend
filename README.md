
# Explorer Food
Explorer Food simulates a website where a restaurant owner can manage his dishes, creating, updating or deleting dishes.

It also can be used by the costumers, where they can look what dishes the restaurant has.

Food Explorer uses Node.js + Express, Knex.js, dotenv, SQLite and follows an organized architecture

It's the final project of Explorer program on Rocketseat

## Running the project
Using Node 18
- set server port on dotenv
- npm install
- npx knex migrate:latest
- npm run dev

## Diferent type of users
In Food Explorer we have 2 types of users: costumer and admin.

Costumers see the dishes, but can't edit
Admins can see and edit dishes.

When you create an account, you are automatically an costumer. 
To switch to admin, go on the database and change the role from `costumer` to `admin`
