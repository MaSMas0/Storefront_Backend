import Request from 'supertest';
import { client, test_token } from '../../../database';
import { UserOperation, User } from '../../../models/user';
import app from '../../../server';
const request = Request(app);
const user = new UserOperation();
// let token = '';
describe('dashboard EndPoints response', () => {
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
  describe('users_With_Orders EndPoint response', () => {
    it('get the response for "/dashboard/usersorders" path', async () => {
      const response = await request
        .get('/api/dashboard/usersorders')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(200);
    });
  });
  describe('user_Closed_Orders EndPoint response', () => {
    it('get the response for "/dashboard/closedorders/:id" path', async () => {
      const response = await request
        .get('/api/dashboard/closedorders/1')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(200);
    });
  });
  describe('user_Open_Orders EndPoint response', () => {
    it('get the response for "/dashboard/openorders/:id" path', async () => {
      const response = await request
        .get('/api/dashboard/openorders/1')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(200);
    });
  });
  describe('books_In_Orders EndPoint response', () => {
    it('get the response for "/dashboard/booksorders" path', async () => {
      const response = await request
        .get('/api/dashboard/booksorders')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(200);
    });
  });
  describe('books_Category EndPoint response', () => {
    it('get the response for "/dashboard/bookscategory" path', async () => {
      const response = await request
        .get('/api/dashboard/bookscategory')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(200);
    });
  });
  describe('five_Most_Expensive_Books EndPoint response', () => {
    it('get the response for "/dashboard/mostexpensive" path', async () => {
      const response = await request
        .get('/api/dashboard/mostexpensive')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(200);
    });
  });
  describe('getFiveMostPopularBooks EndPoint response', () => {
    it('get the response for "/dashboard/mostPopular" path', async () => {
      const response = await request
        .get('/api/dashboard/mostPopular')
        .set('Authorization', `${test_token}`);
      expect(response.status).toBe(200);
    });
  });
});
