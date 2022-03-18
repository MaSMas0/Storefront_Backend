import { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const Dashboard_Queries = new DashboardQueries();

const users_With_Orders = async (req: Request, res: Response) => {
  try {
    const users_Orders_Indexed = await Dashboard_Queries.usersWithOrders();
    res.json(users_Orders_Indexed);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const user_Closed_Orders = async (req: Request, res: Response) => {
  try {
    const User_closeOrders_Indexed = await Dashboard_Queries.userClosedOrders(
      req.params.id
    );
    res.json(User_closeOrders_Indexed);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const user_Open_Orders = async (req: Request, res: Response) => {
  try {
    const User_openOrders_Indexed = await Dashboard_Queries.userOpenOrders(
      req.params.id
    );
    res.json(User_openOrders_Indexed);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const books_Category = async (req: Request, res: Response) => {
  try {
    const books_with_same_category = await Dashboard_Queries.books_category(
      req.body.type
    );
    res.json(books_with_same_category);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const books_In_Orders = async (req: Request, res: Response) => {
  try {
    const books_ordered_indexed = await Dashboard_Queries.booksInOrders();
    res.json(books_ordered_indexed);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const five_Most_Expensive_Books = async (req: Request, res: Response) => {
  try {
    const most_Expensive = await Dashboard_Queries.fiveMostExpensiveBooks();
    res.json(most_Expensive);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getFiveMostPopularBooks = async (req: Request, res: Response) => {
  try {
    const most_Popular = await Dashboard_Queries.getMostPopularBooks();
    res.json(most_Popular);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export {
  users_With_Orders,
  user_Closed_Orders,
  user_Open_Orders,
  books_In_Orders,
  books_Category,
  five_Most_Expensive_Books,
  getFiveMostPopularBooks
};
