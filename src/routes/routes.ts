import { Request, Response, Router } from 'express';
import userRoutes from './API/user';
import bookRoutes from './API/book';
const routes = Router();

routes.use('/users', userRoutes);
routes.get('/users', (_req: Request, res: Response) => {
  res.send('Users operations (Create,Delete,Update,Index,Show');
});

routes.use('/books', bookRoutes);
routes.get('/books', (_req: Request, res: Response) => {
  res.send('Bookstore (Create,Delete,Update,Index,Show)');
});

export default routes;
