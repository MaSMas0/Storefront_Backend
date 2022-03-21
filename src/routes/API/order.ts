import { Router } from 'express';
import { create, destroy, index, show, update } from '../../handlers/order';
import { BearerTokenVerification } from '../../middlewares/authentication';

const routes = Router();

routes.post('/create', BearerTokenVerification, create);
routes.delete('/delete', BearerTokenVerification, destroy);
routes.get('/index', BearerTokenVerification, index);
routes.get('/show/:id', BearerTokenVerification, show);
routes.put('/update/:id', BearerTokenVerification, update);
export default routes;
