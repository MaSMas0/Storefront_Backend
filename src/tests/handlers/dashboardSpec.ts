import Request from 'supertest';
import { client } from '../../database';
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

describe('dashboard service HTTP Operations tests', () => {
  const o = {
    user_id: '1',
    status: 'open'
  } as Order;
  const o1 = {
    user_id: '1',
    status: 'closed'
  } as Order;
  const o2 = {
    user_id: '1',
    status: 'closed'
  } as Order;
  const o3 = {
    user_id: '1',
    status: 'open'
  } as Order;
  const o4 = {
    user_id: '2',
    status: 'open'
  } as Order;
  const o5 = {
    user_id: '3',
    status: 'open'
  } as Order;
  const o6 = {
    user_id: '4',
    status: 'open'
  } as Order;
  const o7 = {
    user_id: '4',
    status: 'open'
  } as Order;
  const o8 = {
    user_id: '6',
    status: 'open'
  } as Order;
  const o9 = {
    user_id: '6',
    status: 'open'
  } as Order;
  const o10 = {
    user_id: '6',
    status: 'open'
  } as Order;
  const o11 = {
    user_id: '6',
    status: 'open'
  } as Order;

  const b = {
    title: "Harry Potter and the philsopher's stone",
    total_pages: 223,
    author: 'J.K. Rowling',
    type: 'fantasy',
    summary:
      'Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry',
    price: 14
  } as Book;
  const b1 = {
    title: '3 men in a boat',
    total_pages: 200,
    author: 'Jerome K.Jerome',
    type: 'traveling',
    summary: '3 friends went on a river voyage as a vacation',
    price: 8
  } as Book;
  const b2 = {
    title: 'oliver twist',
    total_pages: 600,
    author: 'charles dickens',
    type: 'drama',
    summary: 'a story about an orphan boy who had a very tough childhood',
    price: 20
  } as Book;
  const b3 = {
    title: 'harry potter and the chamber of secrets',
    total_pages: 251,
    author: 'J.K. Rowling',
    type: 'fantasy',
    summary: '3 friends went on a river voyage as a vacation',
    price: 12
  } as Book;
  const b4 = {
    title: 'The Odyssey',
    total_pages: 400,
    author: 'Homer',
    type: 'Epic poetry',
    summary:
      'describes the journey of Odysseus on his way home after the battle of Troy',
    price: 40
  } as Book;
  const b5 = {
    title: 'Alice in Wonderland',
    total_pages: 52,
    author: 'Lewis Carroll',
    type: 'fantasy',
    summary:
      'Alice is a young girl that went on a journey full of wonders because of her curiousity',
    price: 5
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
  const u2 = {
    username: 'annie',
    email: 'annie@merlya.com',
    password_digest: 'armin'
  } as User;
  const u3 = {
    username: 'eren yeager',
    email: 'eren@eldia.com',
    password_digest: 'rumbling'
  } as User;
  const u4 = {
    username: 'reiner braun',
    email: 'reiner@merlya.com',
    password_digest: 'historia'
  } as User;
  const u5 = {
    username: 'zeke yeager',
    email: 'zeke@merlya.com',
    password_digest: 'tom ksaver'
  } as User;
  const ob = {
    order_id: '1',
    book_id: '1',
    quantity: 1
  } as OrderBook;
  const ob1 = {
    order_id: '4',
    book_id: '2',
    quantity: 8
  } as OrderBook;
  const ob2 = {
    order_id: '5',
    book_id: '3',
    quantity: 7
  } as OrderBook;
  const ob3 = {
    order_id: '6',
    book_id: '4',
    quantity: 5
  } as OrderBook;
  const ob4 = {
    order_id: '7',
    book_id: '5',
    quantity: 10
  } as OrderBook;
  const ob5 = {
    order_id: '8',
    book_id: '6',
    quantity: 23
  } as OrderBook;
  const ob6 = {
    order_id: '9',
    book_id: '2',
    quantity: 20
  } as OrderBook;
  const ob7 = {
    order_id: '10',
    book_id: '1',
    quantity: 15
  } as OrderBook;
  const ob8 = {
    order_id: '11',
    book_id: '1',
    quantity: 11
  } as OrderBook;
  const ob9 = {
    order_id: '12',
    book_id: '2',
    quantity: 12
  } as OrderBook;
  beforeAll(async () => {
    const userCreation = await user.create(u);
    u.id = userCreation.id;
    const user2Creation = await user.create(u1);
    u1.id = user2Creation.id;
    const user3Creation = await user.create(u2);
    u2.id = user3Creation.id;
    const user4Creation = await user.create(u3);
    u3.id = user4Creation.id;
    const user5Creation = await user.create(u4);
    u4.id = user5Creation.id;
    const user6Creation = await user.create(u5);
    u5.id = user6Creation.id;
    const orderCreation = await order.create(o);
    o.id = orderCreation.id;
    const order2Creation = await order.create(o1);
    o1.id = order2Creation.id;
    const order3Creation = await order.create(o2);
    o2.id = order3Creation.id;
    const order4Creation = await order.create(o3);
    o3.id = order4Creation.id;
    const order5Creation = await order.create(o4);
    o4.id = order5Creation.id;
    const order6Creation = await order.create(o5);
    o5.id = order6Creation.id;
    const order7Creation = await order.create(o6);
    o6.id = order7Creation.id;
    const order8Creation = await order.create(o7);
    o7.id = order8Creation.id;
    const order9Creation = await order.create(o8);
    o8.id = order9Creation.id;
    const order10Creation = await order.create(o9);
    o9.id = order10Creation.id;
    const order11Creation = await order.create(o10);
    o10.id = order11Creation.id;
    const order12Creation = await order.create(o11);
    o11.id = order12Creation.id;
    const bookCreation = await book.create(b);
    b.id = bookCreation.id;
    const book2Creation = await book.create(b1);
    b1.id = book2Creation.id;
    const book3Creation = await book.create(b2);
    b2.id = book3Creation.id;
    const book4Creation = await book.create(b3);
    b3.id = book4Creation.id;
    const book5Creation = await book.create(b4);
    b4.id = book5Creation.id;
    const book6Creation = await book.create(b5);
    b5.id = book6Creation.id;
    const book_in_order = await book_order.addBook(ob);
    ob.id = book_in_order.id;
    const book_in_order2 = await book_order.addBook(ob1);
    ob1.id = book_in_order2.id;
    const book_in_order3 = await book_order.addBook(ob2);
    ob2.id = book_in_order3.id;
    const book_in_order4 = await book_order.addBook(ob3);
    ob3.id = book_in_order4.id;
    const book_in_order5 = await book_order.addBook(ob4);
    ob4.id = book_in_order5.id;
    const book_in_order6 = await book_order.addBook(ob5);
    ob5.id = book_in_order6.id;
    const book_in_order7 = await book_order.addBook(ob6);
    ob6.id = book_in_order7.id;
    const book_in_order8 = await book_order.addBook(ob7);
    ob7.id = book_in_order8.id;
    const book_in_order9 = await book_order.addBook(ob8);
    ob8.id = book_in_order9.id;
    const book_in_order10 = await book_order.addBook(ob9);
    ob9.id = book_in_order10.id;
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql =
      'DELETE FROM order_books;\nALTER SEQUENCE order_books_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM books;\nALTER SEQUENCE books_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await conn.query(sql);
    conn.release();
  });

  it('get all users that made orders', async () => {
    const res = await request.get('/api/dashboard/usersorders');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        username: 'armin',
        email: 'armin@eldia.com',
        order_id: 1
      },
      {
        username: 'armin',
        email: 'armin@eldia.com',
        order_id: 2
      },
      {
        username: 'armin',
        email: 'armin@eldia.com',
        order_id: 3
      },
      {
        username: 'armin',
        email: 'armin@eldia.com',
        order_id: 4
      },
      {
        username: 'bertholdt',
        email: 'bertholdt@merlya.com',
        order_id: 5
      },
      {
        username: 'annie',
        email: 'annie@merlya.com',
        order_id: 6
      },
      {
        username: 'eren yeager',
        email: 'eren@eldia.com',
        order_id: 7
      },
      {
        username: 'eren yeager',
        email: 'eren@eldia.com',
        order_id: 8
      },
      {
        username: 'zeke yeager',
        email: 'zeke@merlya.com',
        order_id: 9
      },
      {
        username: 'zeke yeager',
        email: 'zeke@merlya.com',
        order_id: 10
      },
      {
        username: 'zeke yeager',
        email: 'zeke@merlya.com',
        order_id: 11
      },
      {
        username: 'zeke yeager',
        email: 'zeke@merlya.com',
        order_id: 12
      }
    ]);
  });

  it('userClosedOrders tests', async () => {
    const res = await request.get('/api/dashboard/closedorders/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 2,
        user_id: '1',
        status: 'closed'
      },
      {
        id: 3,
        user_id: '1',
        status: 'closed'
      }
    ]);
  });

  it('userOpenOrders tests', async () => {
    const res = await request.get('/api/dashboard/openorders/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        user_id: '1',
        status: 'open'
      },
      {
        id: 4,
        user_id: '1',
        status: 'open'
      }
    ]);
  });

  it('gets all books from same category', async () => {
    const res = await request
      .get('/api/dashboard/bookscategory')
      .set('Content-Type', 'Application/json')
      .send({ type: 'fantasy' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        title: 'Alice in Wonderland',
        author: 'Lewis Carroll',
        price: 5
      },
      {
        title: "Harry Potter and the philsopher's stone",
        author: 'J.K. Rowling',
        price: 14
      },
      {
        title: 'harry potter and the chamber of secrets',
        author: 'J.K. Rowling',
        price: 12
      }
    ]);
  });
  it('get all books in order', async () => {
    const res = await request.get('/api/dashboard/booksorders');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        title: 'Alice in Wonderland',
        price: 5,
        order_id: '8',
        quantity: 23
      },
      {
        title: '3 men in a boat',
        price: 8,
        order_id: '9',
        quantity: 20
      },
      {
        title: "Harry Potter and the philsopher's stone",
        price: 14,
        order_id: '10',
        quantity: 15
      },
      {
        title: '3 men in a boat',
        price: 8,
        order_id: '12',
        quantity: 12
      },
      {
        title: "Harry Potter and the philsopher's stone",
        price: 14,
        order_id: '11',
        quantity: 11
      },
      {
        title: 'The Odyssey',
        price: 40,
        order_id: '7',
        quantity: 10
      },
      {
        title: '3 men in a boat',
        price: 8,
        order_id: '4',
        quantity: 8
      },
      {
        title: 'oliver twist',
        price: 20,
        order_id: '5',
        quantity: 7
      },
      {
        title: 'harry potter and the chamber of secrets',
        price: 12,
        order_id: '6',
        quantity: 5
      },
      {
        title: "Harry Potter and the philsopher's stone",
        price: 14,
        order_id: '1',
        quantity: 1
      }
    ]);
  });
  it('get the 5 most expensive books from the store', async () => {
    const res = await request.get('/api/dashboard/mostexpensive');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        title: 'The Odyssey',
        price: 40
      },
      {
        title: 'oliver twist',
        price: 20
      },
      {
        title: "Harry Potter and the philsopher's stone",
        price: 14
      },
      {
        title: 'harry potter and the chamber of secrets',
        price: 12
      },
      {
        title: '3 men in a boat',
        price: 8
      }
    ]);
  });
  it('get the 5 most popular books from the store', async () => {
    const res = await request.get('/api/dashboard/mostPopular');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        book_id: '2',
        title: '3 men in a boat',
        ordered_qty: '40'
      },
      {
        book_id: '1',
        title: "Harry Potter and the philsopher's stone",
        ordered_qty: '27'
      },
      {
        book_id: '6',
        title: 'Alice in Wonderland',
        ordered_qty: '23'
      },
      {
        book_id: '5',
        title: 'The Odyssey',
        ordered_qty: '10'
      },
      {
        book_id: '3',
        title: 'oliver twist',
        ordered_qty: '7'
      }
    ]);
  });
});
