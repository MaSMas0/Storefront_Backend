import { Router } from 'express';
import { create, destroy, index, show, update } from '../../handlers/book';
import { BearerTokenVerification } from '../../middlewares/authentication';

const routes = Router();

routes.post('/create', BearerTokenVerification, create);
routes.delete('/delete', BearerTokenVerification, destroy);
routes.get('/index', index);
routes.get('/show/:id', show);
routes.put('/update/:id', BearerTokenVerification, update);
export default routes;
