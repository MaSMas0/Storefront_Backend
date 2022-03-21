import Request from 'supertest';
import { client, test_token } from '../../../database';
import { UserOperation, User } from '../../../models/user';
import app from '../../../server';
// testing users endpoints
const request = Request(app);
const user = new UserOperation();
// let token = '';
describe('order model EndPoints response', () => {
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
      'DELETE FROM order_books;\nALTER SEQUENCE order_books_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM books;\nALTER SEQUENCE books_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  /*
  xdescribe('authentication for user endpoint', () => {
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
  }); */
  // i couldnt keep the same method because most likely the http request is blocking so the tests
  // are blocking also so i made a test token just for the sake of the test
  describe('order create EndPoint response', () => {
    it('get the response for "/orderbooks/addbook" path', async () => {
      const response = await request
        .post('/api/orderbooks/addbook')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(400);
      /* due to if condition for the status the fact that it is 400 that it is just a bad request
         but not a problem in the connection to the endpoint itself*/
    });
  });

  describe('order_books index EndPoint response', () => {
    it('get the response for "/orderbooks/index" path', async () => {
      const response = await request
        .get('/api/orderbooks/index')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(200);
    });
  });

  describe('order_books show EndPoint response', () => {
    it('get the response for "/orderbooks/show/:id" path', async () => {
      const response = await request
        .get('/api/orderbooks/show/1')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(200);
    });
  });

  describe('order_books update EndPoint response', () => {
    it('get the response for "/orderbooks/update/:id" path', async () => {
      const response = await request
        .put('/api/orderbooks/update/1')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(200);
    });
  });
  describe('order_books delete EndPoint response', () => {
    it('get the response for "/orderbooks/delete" path', async () => {
      const response = await request
        .delete('/api/orderbooks/delete')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(200);
    });
  });
});
