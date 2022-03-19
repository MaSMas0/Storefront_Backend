import Request from 'supertest';
import client from '../../../database';
import app from '../../../server';
// testing users endpoints
const request = Request(app);

describe('user model EndPoints response', () => {
  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe('user create EndPoint response', () => {
    it('get the response for "/users/create" path', async () => {
      const response = await request.post('/api/users/create');
      expect(response.status).toBe(200);
    });
  });

  describe('users index EndPoint response', () => {
    it('get the response for "/users/index" path', async () => {
      const response = await request.get('/api/users/index');
      expect(response.status).toBe(200);
    });
  });

  describe('users show EndPoint response', () => {
    it('get the response for "/users/show/:id" path', async () => {
      const response = await request.get('/api/users/show/1');
      expect(response.status).toBe(200);
    });
  });

  describe('users update EndPoint response', () => {
    it('get the response for "/users/update/:id" path', async () => {
      const response = await request.put('/api/users/update/1');
      expect(response.status).toBe(200);
    });
  });
  describe('users delete EndPoint response', () => {
    it('get the response for "/users/delete" path', async () => {
      const response = await request.delete('/api/users/delete');
      expect(response.status).toBe(200);
    });
  });
});
