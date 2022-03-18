import { Router } from 'express';
import {
  addBook,
  destroy,
  index,
  show,
  update
} from '../../handlers/order_book';

const routes = Router();

routes.post('/addbook', addBook);
routes.delete('/delete', destroy);
routes.get('/index', index);
routes.get('/show/:id', show);
routes.put('/update/:id', update);
export default routes;
