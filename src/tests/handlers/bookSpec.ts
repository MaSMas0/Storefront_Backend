import Request from 'supertest';
import client from '../../database';
import { Book, BookStore } from '../../models/book';
import app from '../../server';

const request = Request(app);
const book = new BookStore();
describe('Test CRUD API HTTP Operations for Book Model', () => {
  const b = {
    title: "Harry Potter and the philsopher's stone",
    total_pages: 223,
    author: 'J.K. Rowling',
    type: 'fantasy',
    summary:
      'Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry',
    price: 12
  } as Book;
  beforeAll(async () => {
    const bookCreation = await book.create(b);
    b.id = bookCreation.id;
  });
  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      'DELETE FROM books; \n ALTER SEQUENCE books_id_seq RESTART WITH 1;';
    await connection.query(sql);
    connection.release();
  });
  it('should create new book', async () => {
    const res = await request
      .post('/api/books/create')
      .set('Content-Type', 'Application/json')
      .send({
        title: '3 men in a boat',
        total_pages: 223,
        author: 'Jerome K. Jerome',
        type: 'comedy',
        summary:
          'The story begins by introducing George, Harris, Jerome (always referred to as "J."), and a dog, named Montmorency. The men are spending an evening in a room, smoking and discussing illnesses from which they fancy they suffer. They conclude that they are all suffering from "overwork", and need a holiday',
        price: 7
      } as Book);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('3 men in a boat');
    expect(res.body.total_pages).toBe(223);
    expect(res.body.author).toBe('Jerome K. Jerome');
  });

  it('should list all books', async () => {
    const res = await request.get('/api/books/index');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        title: "Harry Potter and the philsopher's stone",
        total_pages: 223,
        author: 'J.K. Rowling',
        type: 'fantasy',
        summary:
          'Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry',
        price: 12
      },
      {
        id: 2,
        title: '3 men in a boat',
        total_pages: 223,
        author: 'Jerome K. Jerome',
        type: 'comedy',
        summary:
          'The story begins by introducing George, Harris, Jerome (always referred to as "J."), and a dog, named Montmorency. The men are spending an evening in a room, smoking and discussing illnesses from which they fancy they suffer. They conclude that they are all suffering from "overwork", and need a holiday',
        price: 7
      }
    ]);
  });

  it('should update info of existing book', async () => {
    const res = await request
      .put(`/api/books/update/${b.id}`)
      .set('Content-Type', 'Application/json')
      .send({
        title: 'oliver twist',
        total_pages: 608,
        author: 'Charles Dickens',
        type: 'classic',
        summary:
          'Oliver Twist is born into a life of poverty and misfortune, raised in a workhouse in the fictional town of Mudfog, located 70 miles north of London.He is orphaned by his father mysterious absence and his mother Agnes death in childbirth, welcomed only in the workhouse and robbed of her gold name lockety',
        price: 7
      } as unknown as Book);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(b.id);
    expect(res.body.title).toBe('oliver twist');
    expect(res.body.total_pages).toBe(608);
    expect(res.body.author).toBe('Charles Dickens');
  });

  it('should show a specific book according to its id', async () => {
    const res = await request.get('/api/books/show/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      title: 'oliver twist',
      author: 'Charles Dickens',
      price: 7
    });
  });

  it('should delete existing book', async () => {
    const res = await request
      .delete('/api/books/delete')
      .set('Content-Type', 'Application/json')
      .send({
        id: b.id
      } as unknown as Book);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(b.id);
  });
});
