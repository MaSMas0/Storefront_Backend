import client from '../../database';
import { BookStore, Book } from '../../models/book';

const book = new BookStore();

describe('book Model tests', () => {
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
    const conn = await client.connect();
    const sql =
      'DELETE FROM books;\nALTER SEQUENCE books_id_seq RESTART WITH 1';
    await conn.query(sql);
    conn.release();
  });
  describe('book.create tests', () => {
    it('should have a book.create method', () => {
      expect(book.create).toBeDefined();
    });

    it('book.create method should add a book', async () => {
      const result = await book.create({
        title: '3 men in a boat',
        total_pages: 223,
        author: 'Jerome K. Jerome',
        type: 'comedy',
        summary:
          'The story begins by introducing George, Harris, Jerome (always referred to as "J."), and a dog, named Montmorency. The men are spending an evening in a room, smoking and discussing illnesses from which they fancy they suffer. They conclude that they are all suffering from "overwork", and need a holiday',
        price: 7
      });
      expect(result).toEqual({
        id: result.id,
        title: '3 men in a boat',
        total_pages: 223,
        author: 'Jerome K. Jerome',
        type: 'comedy',
        summary:
          'The story begins by introducing George, Harris, Jerome (always referred to as "J."), and a dog, named Montmorency. The men are spending an evening in a room, smoking and discussing illnesses from which they fancy they suffer. They conclude that they are all suffering from "overwork", and need a holiday',
        price: 7
      });
    });
  });

  describe('book.update tests', () => {
    it('should have a book.update method', () => {
      expect(book.update).toBeDefined();
    });
    it('book.update method should update book info', async () => {
      const updated = await book.update({
        id: 1,
        title: 'oliver twist',
        total_pages: 608,
        author: 'Charles Dickens',
        type: 'classic',
        summary:
          'Oliver Twist is born into a life of poverty and misfortune, raised in a workhouse in the fictional town of Mudfog, located 70 miles north of London.He is orphaned by his father mysterious absence and his mother Agnes death in childbirth, welcomed only in the workhouse and robbed of her gold name lockety',
        price: 7
      });

      expect(updated.id).toEqual(b.id);
      expect(updated.title).toEqual('oliver twist');
      expect(updated.total_pages).toEqual(608);
      expect(updated.author).toEqual('Charles Dickens');
    });
  });

  describe('book.index tests', () => {
    it('should have a book.index method', () => {
      expect(book.index).toBeDefined();
    });
    it('index method should return a list of all books', async () => {
      const result = await book.index();
      expect(result).toEqual([
        {
          id: 2,
          title: '3 men in a boat',
          total_pages: 223,
          author: 'Jerome K. Jerome',
          type: 'comedy',
          summary:
            'The story begins by introducing George, Harris, Jerome (always referred to as "J."), and a dog, named Montmorency. The men are spending an evening in a room, smoking and discussing illnesses from which they fancy they suffer. They conclude that they are all suffering from "overwork", and need a holiday',
          price: 7
        },
        {
          id: 1,
          title: 'oliver twist',
          total_pages: 608,
          author: 'Charles Dickens',
          type: 'classic',
          summary:
            'Oliver Twist is born into a life of poverty and misfortune, raised in a workhouse in the fictional town of Mudfog, located 70 miles north of London.He is orphaned by his father mysterious absence and his mother Agnes death in childbirth, welcomed only in the workhouse and robbed of her gold name lockety',
          price: 7
        }
      ]);
    });
  });

  describe('book.show tests', () => {
    it('should have a user.book method', () => {
      expect(book.show).toBeDefined();
    });
    it('book.show method should a specific book according to the id provided', async () => {
      const result = await book.show(1);
      expect(result.id).toBe(1);
      expect(result.title).toBe('oliver twist');
      expect(result.author).toBe('Charles Dickens');
    });
  });
  describe('book.delete tests', () => {
    it('should have a book.delete method', () => {
      expect(book.delete).toBeDefined();
    });
    it('user.delete method should delete a user', async () => {
      const del = await book.delete(b.id as number);
      expect(del.id).toEqual(b.id);
    });
  });
});
