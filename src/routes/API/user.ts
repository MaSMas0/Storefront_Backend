import { Router } from 'express';
import {
  create,
  authenticate,
  destroy,
  index,
  show,
  update
} from '../../handlers/user';
import { BearerTokenVerification } from '../../middlewares/authentication';

const routes = Router();

routes.post('/create', create);
routes.post('/auth', authenticate);
routes.delete('/delete', BearerTokenVerification, destroy);
routes.get('/index', BearerTokenVerification, index);
routes.get('/show/:id', BearerTokenVerification, show);
routes.put('/update/:id', BearerTokenVerification, update);
export default routes;
