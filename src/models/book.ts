import { client } from '../database';

export type Book = {
  id?: number;
  title: string;
  total_pages: number;
  author: string;
  type: string;
  summary: string;
  price: number;
};

export class BookStore {
  async create(b: Book): Promise<Book> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO books (title, total_pages, author, type, summary, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      const result = await conn.query(sql, [
        b.title,
        b.total_pages,
        b.author,
        b.type,
        b.summary,
        b.price
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `cant add new book with title: (${b.title}) due to Error: ${error}`
      );
    }
  }
  async delete(id: number): Promise<Book> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM books WHERE id = $1 RETURNING id, title, author';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `can't Delete the book number (${id}) due to Error: ${error}`
      );
    }
  }
  async index(): Promise<Book[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM books';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not find books due to Error: ${error}`);
    }
  }
  async show(id: number): Promise<Book> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, title, author, price FROM books WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not find book number ${id} due to Error: ${error}`
      );
    }
  }
  async update(b: Book): Promise<Book> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE books SET title=$1, total_pages=$2, author=$3, type=$4, summary=$5, price=$6 WHERE id=$7 RETURNING *';
      const result = await conn.query(sql, [
        b.title,
        b.total_pages,
        b.author,
        b.type,
        b.summary,
        b.price,
        b.id
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update data for book number ${b.id} due to Error: ${error}`
      );
    }
  }
}
