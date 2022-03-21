import { client } from '../../database';
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
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await conn.query(sql);
    conn.release();
  });
  describe('user.authenticate tests', () => {
    it('should have a user.authenticate method', () => {
      expect(user.authenticate).toBeDefined();
    });
    it('Authenticate method should return the authenticated user', async () => {
      const authenticatedUser = await user.authenticate(
        u.email,
        u.password_digest as string
      );
      expect(authenticatedUser?.email).toBe(u.email);
      expect(authenticatedUser?.username).toBe(u.username);
    });
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
      expect(result.id).toEqual(2);
      expect(result.username).toEqual('batman');
      expect(result.email).toEqual('batman@brucewane.com');
      expect(result.password_digest).not.toEqual('gotham');
    });
  });

  describe('user.update tests', () => {
    it('should have a user.update method', () => {
      expect(user.update).toBeDefined();
    });
    it('user.update method should update user info', async () => {
      const updated = await user.update({
        id: 1,
        username: 'bertholdt',
        email: 'bert@merlya.com',
        password_digest: 'annie'
      });

      expect(updated.id).toEqual(u.id);
      expect(updated.username).toEqual('bertholdt');
      expect(updated.email).toEqual('bert@merlya.com');
      expect(updated.password_digest).not.toEqual('annie');
    });
  });
  describe('user.index tests', () => {
    it('should have a user.index method', () => {
      expect(user.index).toBeDefined();
    });
    it('index method should return a list of users', async () => {
      const result = await user.index();
      expect(result).toEqual([
        {
          id: 2,
          username: 'batman',
          email: 'batman@brucewane.com'
        },
        {
          id: 1,
          username: 'bertholdt',
          email: 'bert@merlya.com'
        }
      ]);
    });
  });
  describe('user.show tests', () => {
    it('should have a user.show method', () => {
      expect(user.show).toBeDefined();
    });
    it('user.show method should a specific user according to the id provided', async () => {
      const result = await user.show(1);
      expect(result.id).toBe(1);
      expect(result.username).toBe('bertholdt');
      expect(result.email).toBe('bert@merlya.com');
    });
  });
  describe('user.delete tests', () => {
    it('should have a user.delete method', () => {
      expect(user.delete).toBeDefined();
    });
    it('user.delete method should delete a user', async () => {
      const del = await user.delete(u.id as number);
      expect(del.id).toEqual(u.id);
    });
  });
});
