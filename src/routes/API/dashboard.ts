import { Router } from 'express';
import {
  users_With_Orders,
  user_Closed_Orders,
  user_Open_Orders,
  books_In_Orders,
  books_Category,
  five_Most_Expensive_Books,
  getFiveMostPopularBooks
} from '../../handlers/dashboard';

const routes = Router();

routes.get('/usersorders', users_With_Orders);
routes.get('/closedorders/:id', user_Closed_Orders);
routes.get('/openorders/:id', user_Open_Orders);
routes.get('/booksorders', books_In_Orders);
routes.get('/bookscategory', books_Category);
routes.get('/mostexpensive', five_Most_Expensive_Books);
routes.get('/mostPopular', getFiveMostPopularBooks);
export default routes;
