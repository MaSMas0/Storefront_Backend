import Request from 'supertest';
import { client } from '../../../database';
import { User, UserOperation } from '../../../models/user';
import app from '../../../server';
// testing users endpoints
const request = Request(app);
const user = new UserOperation();
let token = '';
describe('user model EndPoints response', () => {
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
    const connection = await client.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe('authentication for user endpoint', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/users/auth')
        .set('Content-type', 'application/json')
        .send({
          email: u.email,
          password_digest: u.password_digest
        });
      const BearerToken = res.body.token;
      token = BearerToken;
      expect(res.status).toBe(200);
    });
  });
  describe('user create EndPoint response', () => {
    it('get the response for "/users/create" path', async () => {
      const response = await request.post('/api/users/create');
      expect(response.status).toBe(200);
    });
  });

  describe('users index EndPoint response', () => {
    it('get the response for "/users/index" path', async () => {
      const response = await request
        .get('/api/users/index')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  describe('users show EndPoint response', () => {
    it('get the response for "/users/show/:id" path', async () => {
      const response = await request
        .get('/api/users/show/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  describe('users update EndPoint response', () => {
    it('get the response for "/users/update/:id" path', async () => {
      const response = await request
        .put('/api/users/update/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
  describe('users delete EndPoint response', () => {
    it('get the response for "/users/delete" path', async () => {
      const response = await request
        .delete('/api/users/delete')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
