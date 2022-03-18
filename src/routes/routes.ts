import { Request, Response, Router } from 'express';
import userRoutes from './API/user';
import bookRoutes from './API/book';
import orderRoutes from './API/order';
import order_book_Routes from './API/order_book';
import dashboard_Routes from './API/dashboard';
const routes = Router();

routes.use('/users', userRoutes);
routes.get('/users', (_req: Request, res: Response) => {
  res.send('Users operations (Create,Delete,Update,Index,Show');
});

routes.use('/books', bookRoutes);
routes.get('/books', (_req: Request, res: Response) => {
  res.send('Bookstore (Create,Delete,Update,Index,Show)');
});
routes.use('/orders', orderRoutes);
routes.get('/orders', (_req: Request, res: Response) => {
  res.send('orders list operations (Create,Delete,Update,Index,Show)');
});
routes.use('/orderbooks', order_book_Routes);
routes.get('/orderbooks', (_req: Request, res: Response) => {
  res.send('books in an order operations (Create,Delete,Update,Index,Show)');
});
routes.use('/dashboard', dashboard_Routes);
routes.get('/dashboard', (_req: Request, res: Response) => {
  res.send('dashboard queries');
});

export default routes;
