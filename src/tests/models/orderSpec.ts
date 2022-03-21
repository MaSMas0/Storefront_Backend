import { client } from '../../database';
import { OrderList, Order } from '../../models/order';
import { User, UserOperation } from '../../models/user';

const order = new OrderList();
const user = new UserOperation();
describe('order Model tests', () => {
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
  describe('order.create tests', () => {
    it('should have a order.create method', () => {
      expect(order.create).toBeDefined();
    });

    it('order.create method should add an order', async () => {
      const result = await order.create({
        user_id: '1',
        status: 'closed'
      });
      expect(result).toEqual({
        id: result.id,
        user_id: result.user_id,
        status: 'closed'
      });
    });
  });

  describe('order.update tests', () => {
    it('should have an order.update method', () => {
      expect(order.update).toBeDefined();
    });
    it('order.update method should update order data', async () => {
      const updated = await order.update({
        id: 1,
        user_id: '2',
        status: 'closed'
      } as Order);

      expect(updated.id).toEqual(o.id);
      expect(updated.user_id).toEqual('2');
      expect(updated.status).toEqual('closed');
    });
  });
  describe('order.index tests', () => {
    it('should have a order.index method', () => {
      expect(order.index).toBeDefined();
    });
    it('index method should return a list of orders', async () => {
      const result = await order.index();
      expect(result).toEqual([
        {
          id: 2,
          user_id: '1',
          status: 'closed'
        },
        {
          id: 1,
          user_id: '2',
          status: 'closed'
        }
      ]);
    });
  });
  describe('order.show tests', () => {
    it('should have an order.show method', () => {
      expect(order.show).toBeDefined();
    });
    it('order.show method should a specific order according to the id provided', async () => {
      const result = await order.show(1);
      expect(result.id).toBe(1);
      expect(result.user_id).toBe('2');
      expect(result.status).toBe('closed');
    });
  });
  describe('order.delete tests', () => {
    it('should have an order.delete method', () => {
      expect(order.delete).toBeDefined();
    });
    it('order.delete method should delete an order', async () => {
      const del = await order.delete(o.id as number);
      expect(del.id).toEqual(o.id);
    });
  });
});
