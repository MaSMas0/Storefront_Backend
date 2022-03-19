import Request from 'supertest';
import client from '../../../database';
import app from '../../../server';
// testing users endpoints
const request = Request(app);

describe('book model EndPoints response', () => {
  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      'DELETE FROM books;\nALTER SEQUENCE books_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe('book create EndPoint response', () => {
    it('get the response for "/books/create" path', async () => {
      const response = await request.post('/api/books/create');
      expect(response.status).toBe(200);
    });
  });

  describe('books index EndPoint response', () => {
    it('get the response for "/books/index" path', async () => {
      const response = await request.get('/api/books/index');
      expect(response.status).toBe(200);
    });
  });

  describe('books show EndPoint response', () => {
    it('get the response for "/books/show/:id" path', async () => {
      const response = await request.get('/api/books/show/1');
      expect(response.status).toBe(200);
    });
  });

  describe('books update EndPoint response', () => {
    it('get the response for "/users/update/:id" path', async () => {
      const response = await request.put('/api/books/update/1');
      expect(response.status).toBe(200);
    });
  });
  describe('books delete EndPoint response', () => {
    it('get the response for "/books/delete" path', async () => {
      const response = await request.delete('/api/books/delete');
      expect(response.status).toBe(200);
    });
  });
});
