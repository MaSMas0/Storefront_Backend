import { Request, Response } from 'express';
import { OrderBook, BookOrder } from '../models/order_book';

const Book_Order = new BookOrder();

const addBook = async (req: Request, res: Response) => {
  try {
    const addedBook: OrderBook = {
      order_id: req.body.order_id,
      book_id: req.body.book_id,
      quantity: req.body.quantity
    };
    const new_added_book = await Book_Order.addBook(addedBook);
    res.json(new_added_book);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const deleted_order_book = await Book_Order.delete(
      req.body.order_id,
      req.body.book_id
    );
    res.json(deleted_order_book);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const orders_books_Indexed = await Book_Order.index();
    res.json(orders_books_Indexed);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const show_order_book = await Book_Order.show(req.params.id);
    res.json(show_order_book);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const order_book: OrderBook = {
      order_id: req.body.order_id,
      book_id: req.body.book_id,
      quantity: req.body.quantity,
      id: parseInt(req.params.id, 10)
    };
    const updated_order_book = await Book_Order.update(order_book);
    res.json(updated_order_book);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export { addBook, destroy, index, show, update };
