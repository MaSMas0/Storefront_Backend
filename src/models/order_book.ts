import { client } from '../database';
import { Order } from './order';

export type OrderBook = {
  id?: number;
  order_id?: string;
  book_id: string;
  quantity: number;
};
export type OrderShow = {
  order_id?: string;
  book_id: string;
  quantity: number;
  title: string;
};
export class BookOrder {
  async addBook(bo: OrderBook): Promise<OrderBook> {
    // get order to see if it is open first before inserting any new products
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(ordersql, [bo.order_id]);

      const order = result.rows[0] as Order;

      if (order.status !== 'open') {
        //if it is closed throw an error
        throw new Error(
          `Could not add book ${bo.book_id} to order ${bo.order_id} because order status is ${order.status}`
        );
      }
      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        'INSERT INTO order_books (quantity, order_id, book_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        bo.quantity,
        bo.order_id,
        bo.book_id
      ]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add book ${bo.book_id} to order ${bo.order_id} due to Error: ${err}`
      );
    }
  }

  async index(): Promise<OrderBook[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM order_books;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Error at retrieving books in orders due to Error: ${error}`
      );
    }
  }

  async show(book_id: string): Promise<OrderShow[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT book_id, order_id, books.title, quantity FROM order_books INNER JOIN books ON books.id=order_books.book_id WHERE book_id=$1';
      const result = await conn.query(sql, [book_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Error at retrieving book:${book_id} in orders due to Error: ${error}`
      );
    }
  }

  async update(bo: OrderBook): Promise<OrderBook> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE order_books SET quantity=$1, order_id=$2,  book_id=$3 WHERE id=$4 RETURNING *';
      const result = await conn.query(sql, [
        bo.quantity,
        bo.order_id,
        bo.book_id,
        bo.id
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update book: ${bo.book_id} in order ${bo.order_id} due to Error: ${error}`
      );
    }
  }

  async delete(order_id: string, book_id: string): Promise<OrderBook> {
    try {
      const conn = await client.connect();
      const sql =
        'DELETE FROM order_books WHERE order_id=($1) and book_id=($2) RETURNING *';

      const result = await conn.query(sql, [order_id, book_id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete book: ${book_id} in order ${order_id} due to Error: ${error}`
      );
    }
  }
}
