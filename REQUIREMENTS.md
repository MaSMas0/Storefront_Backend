# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Books

- ✅ Create `POST [/api/books/create]` [token required]
- ✅ Index `GET [/api/books/index]`
- ✅ Show `GET [/api/books/show/:id]`
- ✅ Update `PUT [/api/books/update/:id]` [token required]
- ✅ Delete `DELETE [/api/books/delete]` [token required]

#### Users

- ✅ Create `POST [/api/users/create]` 
- ✅ Authenticate user `POST [/api/users/auth]`
- ✅ Index `GET [/api/users/index]` [token required]
- ✅ Show `GET [/api/users/show/:id]` [token required]
- ✅ Update `PUT [/api/users/update/:id]` [token required]
- ✅ Delete `DELETE [/api/users/delete]` [token required]

#### Orders

- ✅ Create `POST [/api/orders/create]` [token required]
- ✅ Index `GET [/api/orders/index]` [token required]
- ✅ Show `GET [/api/orders/show/:id]` [token required]
- ✅ Update `PUT [/api/orders/update/:id]` [token required]
- ✅ Delete `DELETE [/api/orders/delete]` [token required]

#### orderbooks
- ✅ Add a book to an order `POST [/api/orderbooks/addbook]` [token required]
- ✅ Index `GET [/api/orderbooks/index]` [token required]
- ✅ Show `GET [/api/orderbooks/show/:id]` [token required]
- ✅ Update `PUT [/api/orderbooks/update/:id]` [token required]
- ✅ Delete `DELETE [/api/orderbooks/delete]` [token required]

#### dashboard

- ✅ [Additional] get all users with orders `GET [/api/dashboard/usersorders]` [token required]
- ✅ [OPTIONAL] Completed (closed) Orders by user (args: user id) `GET [/api/dashboard/closedorders/:id]` [token required]
- ✅ [additional] Active (open) orders by user (args: user id) `GET [/api/dashboard/openorders/:id]` [token required]
- ✅ [additional] Get books orders `GET [/api/dashboard/booksorders]` [token required]
- ✅ [OPTIONAL] books by category (args: book type) `GET [/api/dashboard/bookscategory]` [token required]
- ✅ [additional] Top 5 Most expensive books `GET [/api/dashboard/mostexpensive]` [token required]
- ✅ [OPTIONAL] Top 5 most popular books `GET [/api/dashboard/mostPopular]` [token required]




## Database Tables (Migerations)

#### books

- id
- title
- total_pages
- total_pages
- author
- [OPTIONAL] category (type)
- summary
- price

```sql

CREATE TABLE books (
    id SERIAL PRIMARY  KEY,
    title VARCHAR(150),
    total_pages integer,
    author VARCHAR(255),
    type VARCHAR(100),
    summary text,
    price integer
);

```

#### User

- id
- username
- email
- password_digest

```sql

CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(60),
      email VARCHAR(200),
      password_digest VARCHAR(220)
  );

```

#### Orders

- id
- status of order open or closed (active or completed)
- user_id as a foreign key

```sql

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);
```

#### Order_books

- id of each product in the order
- quantity of each product in the order
- order_id as a foreign key
- book-id as a foreign key


```sql
CREATE TABLE order_books (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    book_id bigint REFERENCES books(id)
);

```