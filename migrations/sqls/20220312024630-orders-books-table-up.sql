CREATE TABLE order_books (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    book_id bigint REFERENCES books(id)
);