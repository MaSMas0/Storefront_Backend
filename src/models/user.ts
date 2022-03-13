import client from '../database';

export type User = {
  id?: number;
  username: string;
  email: string;
  password_digest: string;
};

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
}
