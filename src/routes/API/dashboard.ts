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
import { BearerTokenVerification } from '../../middlewares/authentication';

const routes = Router();

routes.get('/usersorders', BearerTokenVerification, users_With_Orders);
routes.get('/closedorders/:id', BearerTokenVerification, user_Closed_Orders);
routes.get('/openorders/:id', BearerTokenVerification, user_Open_Orders);
routes.get('/booksorders', BearerTokenVerification, books_In_Orders);
routes.get('/bookscategory', BearerTokenVerification, books_Category);
routes.get(
  '/mostexpensive',
  BearerTokenVerification,
  five_Most_Expensive_Books
);
routes.get('/mostPopular', BearerTokenVerification, getFiveMostPopularBooks);
export default routes;
