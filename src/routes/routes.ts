import { Request, Response, Router } from 'express';
import userRoutes from './API/user';

const routes = Router();

routes.use('/users', userRoutes);
routes.get('/users', (req: Request, res: Response) => {
  res.send('Users operations (Create,Delete,Update,Index,Show');
});
export default routes;
