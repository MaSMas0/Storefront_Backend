import client from '../database';
import { Book } from '../models/book';
import { Order } from '../models/order';
import { OrderBook } from '../models/order_book';
export class DashboardQueries {
  // Get all users that have made orders
  async usersWithOrders(): Promise<{ username: string; email: string }[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT username, email, orders.id AS order_id FROM users INNER JOIN orders ON users.id = orders.user_id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get users with orders due to Error: ${error}`);
    }
  }
  async userClosedOrders(user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status=$2';
      const result = await conn.query(sql, [user_id, 'closed']);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get user closed orders due to Error: ${error}`);
    }
  }
  async userOpenOrders(user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=$1 AND status=$2';
      const result = await conn.query(sql, [user_id, 'open']);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get user open orders due to Error: ${error}`);
    }
  }

  async books_category(type: string): Promise<Book[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM books WHERE type = $1';
      const result = await conn.query(sql, [type]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `unable get books from this category due to Error: ${error}`
      );
    }
  }
  // Get all products that have been included in orders
  async booksInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT title, price, order_id, order_books.quantity FROM books INNER JOIN order_books ON books.id = order_books.book_id';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable get books in orders due to Error: ${error}`);
    }
  }

  async fiveMostExpensiveBooks(): Promise<{ title: string; price: number }[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT title, price FROM books ORDER BY price DESC LIMIT 5';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `unable get five most expensive books due to Error ${error}`
      );
    }
  }

  async getMostPopularBooks(): Promise<OrderBook[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT book_id, books.title, SUM(quantity) FROM order_books INNER JOIN books ON order_books.book_id = books.id GROUP BY order_books.book_id, books.title, order_books.quantity ORDER BY quantity DESC LIMIT 5';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Cannot get the most popular books due to Error: ${error}`
      );
    }
  }
}
