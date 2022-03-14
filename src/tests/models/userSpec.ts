import client from '../../database';
import { UserOperation } from '../../models/user';

const user = new UserOperation();

describe('user Model tests', () => {
  afterAll(async () => {
    const conn = await client.connect();
    const sql =
      'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await conn.query(sql);
    conn.release();
  });
  it('should have a user.create method', () => {
    expect(user.create).toBeDefined();
  });

  it('user.create method should add a user', async () => {
    const result = await user.create({
      username: 'batman',
      email: 'batman@brucewane.com',
      password_digest: 'gotham'
    });
    expect(result).toEqual({
      id: 1,
      username: 'batman',
      email: 'batman@brucewane.com',
      password_digest: 'gotham'
    });
  });
});
