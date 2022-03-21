import Request from 'supertest';
import { client } from '../../../database';
import app from '../../../server';
// testing users endpoints
const request = Request(app);

describe('dashboard EndPoints response', () => {
  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      'DELETE FROM order_books;\nALTER SEQUENCE order_books_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM books;\nALTER SEQUENCE books_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe('users_With_Orders EndPoint response', () => {
    it('get the response for "/dashboard/usersorders" path', async () => {
      const response = await request.get('/api/dashboard/usersorders');
      expect(response.status).toBe(200);
    });
  });
  describe('user_Closed_Orders EndPoint response', () => {
    it('get the response for "/dashboard/closedorders/:id" path', async () => {
      const response = await request.get('/api/dashboard/closedorders/1');
      expect(response.status).toBe(200);
    });
  });
  describe('user_Open_Orders EndPoint response', () => {
    it('get the response for "/dashboard/openorders/:id" path', async () => {
      const response = await request.get('/api/dashboard/openorders/1');
      expect(response.status).toBe(200);
    });
  });
  describe('books_In_Orders EndPoint response', () => {
    it('get the response for "/dashboard/booksorders" path', async () => {
      const response = await request.get('/api/dashboard/booksorders');
      expect(response.status).toBe(200);
    });
  });
  describe('books_Category EndPoint response', () => {
    it('get the response for "/dashboard/bookscategory" path', async () => {
      const response = await request.get('/api/dashboard/bookscategory');
      expect(response.status).toBe(200);
    });
  });
  describe('five_Most_Expensive_Books EndPoint response', () => {
    it('get the response for "/dashboard/mostexpensive" path', async () => {
      const response = await request.get('/api/dashboard/mostexpensive');
      expect(response.status).toBe(200);
    });
  });
  describe('getFiveMostPopularBooks EndPoint response', () => {
    it('get the response for "/dashboard/mostPopular" path', async () => {
      const response = await request.get('/api/dashboard/mostPopular');
      expect(response.status).toBe(200);
    });
  });
});
