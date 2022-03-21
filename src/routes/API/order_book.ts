import { Router } from 'express';
import {
  addBook,
  destroy,
  index,
  show,
  update
} from '../../handlers/order_book';
import { BearerTokenVerification } from '../../middlewares/authentication';

const routes = Router();

routes.post('/addbook', BearerTokenVerification, addBook);
routes.delete('/delete', BearerTokenVerification, destroy);
routes.get('/index', BearerTokenVerification, index);
routes.get('/show/:id', BearerTokenVerification, show);
routes.put('/update/:id', BearerTokenVerification, update);
export default routes;
