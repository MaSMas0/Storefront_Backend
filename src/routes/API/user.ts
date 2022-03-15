import { Router } from 'express';
import { create, destroy } from '../../handlers/user';

const routes = Router();

routes.post('/create', create);
routes.delete('/delete', destroy);
export default routes;
