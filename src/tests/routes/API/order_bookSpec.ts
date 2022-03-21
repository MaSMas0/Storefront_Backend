import Request from 'supertest';
import { client } from '../../../database';
import app from '../../../server';
// testing users endpoints
const request = Request(app);

describe('order model EndPoints response', () => {
  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      'DELETE FROM order_books;\nALTER SEQUENCE order_books_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM books;\nALTER SEQUENCE books_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe('order create EndPoint response', () => {
    it('get the response for "/orderbooks/addbook" path', async () => {
      const response = await request.post('/api/orderbooks/addbook');
      expect(response.status).toBe(400);
      /* due to if condition for the status the fact that it is 400 that it is just a bad request
         but not a problem in the connection to the endpoint itself*/
    });
  });

  describe('order_books index EndPoint response', () => {
    it('get the response for "/order/index" path', async () => {
      const response = await request.get('/api/orderbooks/index');
      expect(response.status).toBe(200);
    });
  });

  describe('order_books show EndPoint response', () => {
    it('get the response for "/orderbooks/show/:id" path', async () => {
      const response = await request.get('/api/orderbooks/show/1');
      expect(response.status).toBe(200);
    });
  });

  describe('order_books update EndPoint response', () => {
    it('get the response for "/orderbooks/update/:id" path', async () => {
      const response = await request.put('/api/orderbooks/update/1');
      expect(response.status).toBe(200);
    });
  });
  describe('order_books delete EndPoint response', () => {
    it('get the response for "/orderbooks/delete" path', async () => {
      const response = await request.delete('/api/orderbooks/delete');
      expect(response.status).toBe(200);
    });
  });
});
