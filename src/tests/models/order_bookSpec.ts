import client from '../../database';
import { OrderList, Order } from '../../models/order';
import { User, UserOperation } from '../../models/user';
import { Book, BookStore } from '../../models/book';
import { OrderBook, BookOrder } from '../../models/order_book';

const order = new OrderList();
const user = new UserOperation();
const book = new BookStore();
const book_order = new BookOrder();
describe('order_book Model tests', () => {
  const o = {
    user_id: '1',
    status: 'open'
  } as Order;
  const o1 = {
    user_id: '2',
    status: 'open'
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
  } as OrderBook;
  beforeAll(async () => {
    const userCreation = await user.create(u);
    u.id = userCreation.id;
    const user2Creation = await user.create(u1);
    u1.id = user2Creation.id;
    const orderCreation = await order.create(o);
    o.id = orderCreation.id;
    const order2Creation = await order.create(o1);
    o1.id = order2Creation.id;
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
  describe('order_book.add book tests', () => {
    it('should have a order_book.addbook method', () => {
      expect(book_order.addBook).toBeDefined();
    });

    it('order_book.create method should add a book to an open order', async () => {
      const result = await book_order.addBook({
        quantity: 3,
        order_id: '2',
        book_id: '2'
      });
      expect(result).toEqual({
        id: 2,
        quantity: result.quantity,
        order_id: '2',
        book_id: '2'
      });
    });
  });

  describe('order_book.update tests', () => {
    it('should have an order_book.update method', () => {
      expect(book_order.update).toBeDefined();
    });
    it('order.update method should update order data', async () => {
      const updated = await book_order.update({
        id: 1,
        quantity: 10,
        order_id: '1',
        book_id: '1'
      } as OrderBook);

      expect(updated.id).toEqual(o.id);
      expect(updated.quantity).toEqual(10);
    });
  });
  describe('order_book.index tests', () => {
    it('should have a order_book.index method', () => {
      expect(book_order.index).toBeDefined();
    });
    it('index method should return a books in orders', async () => {
      const result = await book_order.index();
      expect(result).toEqual([
        {
          id: 2,
          quantity: 3,
          order_id: '2',
          book_id: '2'
        },
        {
          id: 1,
          quantity: 10,
          order_id: '1',
          book_id: '1'
        }
      ]);
    });
  });
  describe('order_book.show tests', () => {
    it('should have an order_book.show method', () => {
      expect(book_order.show).toBeDefined();
    });
    it('order_book.show method should a specific book in all orders according to the book id provided', async () => {
      const result = await book_order.show('1');
      expect(result).toEqual([
        {
          quantity: 10,
          order_id: '1',
          book_id: '1',
          title: "Harry Potter and the philsopher's stone"
        }
      ]);
    });
  });
  describe('order_book.delete tests', () => {
    it('should have an order_book.delete method', () => {
      expect(book_order.delete).toBeDefined();
    });
    it('order.delete method should delete an order', async () => {
      const del = await book_order.delete('1', '1');
      expect(del.book_id).toEqual('1');
    });
  });
});
