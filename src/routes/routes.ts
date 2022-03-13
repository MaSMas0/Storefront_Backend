import { Router } from 'express';
import userRoutes from './API/user';

const routes = Router();

routes.use('/users', userRoutes);

export default routes;
