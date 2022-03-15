import client from '../../database';
import { UserOperation, User } from '../../models/user';

const user = new UserOperation();

describe('user Model tests', () => {
  const u = {
    username: 'armin',
    email: 'armin@eldia.com',
    password_digest: 'annie'
  } as User;
  beforeAll(async () => {
    const userCreation = await user.create(u);
    u.id = userCreation.id;
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql =
      'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await conn.query(sql);
    conn.release();
  });
  describe('user.create tests', () => {
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
        id: result.id,
        username: 'batman',
        email: 'batman@brucewane.com',
        password_digest: 'gotham'
      });
    });
  });
  describe('user.Delete tests', () => {
    it('should have a user.delete method', () => {
      expect(user.delete).toBeDefined();
    });
    it('user.Delete method should delete a user', async () => {
      const del = await user.delete(u.id as number);
      expect(del.id).toEqual(u.id);
    });
  });
});
