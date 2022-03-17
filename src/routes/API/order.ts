import { Router } from 'express';
import { create, destroy, index, show, update } from '../../handlers/order';

const routes = Router();

routes.post('/create', create);
routes.delete('/delete', destroy);
routes.get('/index', index);
routes.get('/show/:id', show);
routes.put('/update/:id', update);
export default routes;
