import Request from 'supertest';
import { client } from '../../database';
import { Order, OrderList } from '../../models/order';
import { User, UserOperation } from '../../models/user';
import app from '../../server';

const request = Request(app);
const order = new OrderList();
const user = new UserOperation();
describe('Test CRUD API HTTP Operations for user model', () => {
  const o = {
    user_id: '1',
    status: 'open'
  } as Order;
  const u = {
    username: 'armin',
    email: 'armin@eldia.com',
    password_digest: 'annie'
  } as User;
  const u2 = {
    username: 'bertholdt',
    email: 'bertholdt@eldia.com',
    password_digest: 'annie'
  } as User;
  beforeAll(async () => {
    const userCreation = await user.create(u);
    u.id = userCreation.id;
    const user2Creation = await user.create(u2);
    u2.id = user2Creation.id;
    const orderCreation = await order.create(o);
    o.id = orderCreation.id;
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql =
      'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await conn.query(sql);
    conn.release();
  });
  it('should create new order', async () => {
    const res = await request
      .post('/api/orders/create')
      .set('Content-Type', 'Application/json')
      .send({
        user_id: '1',
        status: 'closed'
      } as Order);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(2);
    expect(res.body.user_id).toBe('1');
    expect(res.body.status).toBe('closed');
  });

  it('should list all orders', async () => {
    const res = await request.get('/api/orders/index');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        user_id: '1',
        status: 'open'
      },
      {
        id: 2,
        user_id: '1',
        status: 'closed'
      }
    ]);
  });

  it('should update existing order', async () => {
    const res = await request
      .put(`/api/orders/update/${o.id}`)
      .set('Content-Type', 'Application/json')
      .send({
        user_id: '2',
        status: 'closed'
      } as unknown as User);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(o.id);
    expect(res.body.user_id).toBe('2');
    expect(res.body.status).toBe('closed');
  });

  it('should show a specific order according to its id', async () => {
    const res = await request.get('/api/orders/show/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      user_id: '2',
      status: 'closed'
    });
  });

  it('should delete existing order', async () => {
    const res = await request
      .delete('/api/orders/delete')
      .set('Content-Type', 'Application/json')
      .send({
        id: o.id
      } as unknown as Order);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(o.id);
  });
});
