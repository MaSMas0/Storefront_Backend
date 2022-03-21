import { client } from '../database';

export type Order = {
  id?: number;
  user_id: string;
  status: string;
};

export class OrderList {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.user_id, o.status]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create an order ${error}`);
    }
  }
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not find users due to Error: ${error}`);
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Cannot find order number ${id} due to this Error: ${error}`
      );
    }
  }
  async update(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE orders SET user_id=$1, status=$2 WHERE id=$3 RETURNING *';
      const result = await conn.query(sql, [o.user_id, o.status, o.id]);
      conn.release();
      return result.rows[0] as Order;
    } catch (error) {
      throw new Error(
        `Cannot update data for order number ${o.id} due to Error : ${error}`
      );
    }
  }
  async delete(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Cannot delete order number ${id} due to Error: ${error}`
      );
    }
  }
}
