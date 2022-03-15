import { Request, Response } from 'express';
import { Book, BookStore } from '../models/book';

const bookStore = new BookStore();

const create = async (req: Request, res: Response) => {
  try {
    const book: Book = {
      title: req.body.title,
      total_pages: req.body.total_pages,
      author: req.body.author,
      type: req.body.type,
      summary: req.body.summary,
      price: req.body.price
    };
    const newBook = await bookStore.create(book);
    res.json(newBook);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const deletedBook = await bookStore.delete(req.body.id);
    res.json(deletedBook);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const books_Indexed = await bookStore.index();
    res.json(books_Indexed);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const show_Book = await bookStore.show(req.params.id as unknown as number);
    res.json(show_Book);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const book: Book = {
      title: req.body.title,
      total_pages: req.body.total_pages,
      author: req.body.author,
      type: req.body.type,
      summary: req.body.summary,
      price: req.body.price,
      id: parseInt(req.params.id, 10)
    } as Book;
    const updated_Book = await bookStore.update(book);
    res.json(updated_Book);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export { create, destroy, index, show, update };
