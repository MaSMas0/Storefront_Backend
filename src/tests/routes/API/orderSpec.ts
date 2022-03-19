import Request from 'supertest';
import client from '../../../database';
import app from '../../../server';
// testing users endpoints
const request = Request(app);

describe('order model EndPoints response', () => {
  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe('order create EndPoint response', () => {
    it('get the response for "/orders/create" path', async () => {
      const response = await request.post('/api/orders/create');
      expect(response.status).toBe(200);
    });
  });

  describe('orders index EndPoint response', () => {
    it('get the response for "/order/index" path', async () => {
      const response = await request.get('/api/orders/index');
      expect(response.status).toBe(200);
    });
  });

  describe('order show EndPoint response', () => {
    it('get the response for "/orders/show/:id" path', async () => {
      const response = await request.get('/api/orders/show/1');
      expect(response.status).toBe(200);
    });
  });

  describe('order update EndPoint response', () => {
    it('get the response for "/orders/update/:id" path', async () => {
      const response = await request.put('/api/orders/update/1');
      expect(response.status).toBe(200);
    });
  });
  describe('order delete EndPoint response', () => {
    it('get the response for "/orders/delete" path', async () => {
      const response = await request.delete('/api/orders/delete');
      expect(response.status).toBe(200);
    });
  });
});
