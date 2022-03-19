import Request from 'supertest';
import client from '../../database';
import { Book, BookStore } from '../../models/book';
import { Order, OrderList } from '../../models/order';
import { BookOrder, OrderBook } from '../../models/order_book';
import { User, UserOperation } from '../../models/user';
import app from '../../server';

const request = Request(app);
const order = new OrderList();
const user = new UserOperation();
const book = new BookStore();
const book_order = new BookOrder();
describe('Test CRUD API HTTP Operations for order_book model', () => {
  const o = {
    user_id: '1',
    status: 'open'
  } as Order;
  const o1 = {
    user_id: '2',
    status: 'open'
  } as Order;
  const o2 = {
    user_id: '2',
    status: 'closed'
  } as Order;

  const b = {
    title: "Harry Potter and the philsopher's stone",
    total_pages: 223,
    author: 'J.K. Rowling',
    type: 'fantasy',
    summary:
      'Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry',
    price: 12
  } as Book;
  const b1 = {
    title: '3 men in a boat',
    total_pages: 200,
    author: 'Jerome K.Jerome',
    type: 'traveling',
    summary: '3 friends went on a river voyage as a vacation',
    price: 8
  } as Book;
  const u = {
    username: 'armin',
    email: 'armin@eldia.com',
    password_digest: 'annie'
  } as User;
  const u1 = {
    username: 'bertholdt',
    email: 'bertholdt@merlya.com',
    password_digest: 'annie'
  } as User;
  const ob = {
    order_id: '1',
    book_id: '1',
    quantity: 7
  } as unknown as OrderBook;
  beforeAll(async () => {
    const userCreation = await user.create(u);
    u.id = userCreation.id;
    const user2Creation = await user.create(u1);
    u1.id = user2Creation.id;
    const orderCreation = await order.create(o);
    o.id = orderCreation.id;
    const order2Creation = await order.create(o1);
    o1.id = order2Creation.id;
    const order3Creation = await order.create(o2);
    o2.id = order3Creation.id;
    const bookCreation = await book.create(b);
    b.id = bookCreation.id;
    const book2Creation = await book.create(b1);
    b1.id = book2Creation.id;
    const book_in_order = await book_order.addBook(ob);
    ob.id = book_in_order.id;
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql =
      'DELETE FROM order_books;\nALTER SEQUENCE order_books_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM books;\nALTER SEQUENCE books_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await conn.query(sql);
    conn.release();
  });
  it('should add a book to an open order', async () => {
    const res = await request
      .post('/api/orderbooks/addbook')
      .set('Content-Type', 'Application/json')
      .send({
        quantity: 9,
        order_id: '2',
        book_id: '2'
      } as unknown as OrderBook);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(2);
    expect(res.body.order_id).toBe('2');
    expect(res.body.book_id).toBe('2');
    expect(res.body.quantity).toBe(9);
  });

  it('should not add a book to a closed order', async () => {
    const res = await request
      .post('/api/orderbooks/addbook')
      .set('Content-Type', 'Application/json')
      .send({
        quantity: 9,
        order_id: '3',
        book_id: '2'
      } as unknown as OrderBook);
    expect(res.status).toBe(400);
  });

  it('should list all books in orders', async () => {
    const res = await request.get('/api/orderbooks/index');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        order_id: '1',
        book_id: '1',
        quantity: 7
      },
      {
        id: 2,
        order_id: '2',
        book_id: '2',
        quantity: 9
      }
    ]);
  });

  it('should update existing books in orders', async () => {
    const res = await request
      .put(`/api/orderbooks/update/2}`)
      .set('Content-Type', 'Application/json')
      .send({
        order_id: '2',
        book_id: '1',
        quantity: 11
      } as unknown as OrderBook);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(2);
    expect(res.body.order_id).toBe('2');
    expect(res.body.book_id).toBe('1');
    expect(res.body.quantity).toBe(11);
  });

  it('should show a specific book in all orders according to its id', async () => {
    const res = await request.get('/api/orderbooks/show/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        order_id: '1',
        book_id: '1',
        quantity: 7,
        title: "Harry Potter and the philsopher's stone"
      },
      {
        order_id: '2',
        book_id: '1',
        quantity: 11,
        title: "Harry Potter and the philsopher's stone"
      }
    ]);
  });

  it('should delete existing book for a specific order', async () => {
    const res = await request
      .delete('/api/orderbooks/delete')
      .set('Content-Type', 'Application/json')
      .send({
        order_id: '2',
        book_id: '1'
      } as unknown as OrderBook);
    expect(res.status).toBe(200);
    expect(res.body.order_id).toBe('2');
    expect(res.body.book_id).toBe('1');
  });
});
