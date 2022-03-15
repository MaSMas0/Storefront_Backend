import client from '../database';

export type User = {
  id?: number;
  username: string;
  email: string;
  password_digest: string;
};
type UserProtect = Omit<User, 'password_digest'>;
export class UserOperation {
  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (username, email, password_digest) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        u.username,
        u.email,
        u.password_digest
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `cant create the user (${u.username}) due to Error: ${error}`
      );
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'DELETE FROM users WHERE id = $1 RETURNING id, username, email';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `can't Delete the user number (${id}) due to Error: ${error}`
      );
    }
  }
  async index(): Promise<UserProtect[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, username, email FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not find users due to Error: ${error}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, username, email FROM users WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not find user id number ${id} due to Error: ${error}`
      );
    }
  }
  async update(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE users SET username=$1, email=$2, password_digest=$3 WHERE id=$4 RETURNING *';
      const result = await conn.query(sql, [
        u.username,
        u.email,
        u.password_digest,
        u.id
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update data for user id number ${u.id} due to Error: ${error}`
      );
    }
  }
}
