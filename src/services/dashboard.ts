import client from '../database';
import { Order } from '../models/order';
export class DashboardQueries {
  // Get all users that have made orders
  async usersWithOrders(): Promise<
    { username: string; email: string; order_id: number }[]
  > {
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

  async books_category(
    type: string
  ): Promise<{ title: string; author: string; price: number }[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT title, author, price FROM books WHERE type = $1 ORDER BY title';
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
    { title: string; price: number; order_id: string; quantity: number }[]
  > {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT title, price, order_id, order_books.quantity AS quantity FROM books INNER JOIN order_books ON books.id = order_books.book_id ORDER BY quantity DESC';
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

  async getMostPopularBooks(): Promise<
    { book_id: string; title: string; ordered_qty: string }[]
  > {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT book_id, books.title As title, SUM(quantity) AS ordered_qty FROM order_books INNER JOIN books ON order_books.book_id = books.id GROUP BY order_books.book_id, books.title ORDER BY ordered_qty DESC LIMIT 5';
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
