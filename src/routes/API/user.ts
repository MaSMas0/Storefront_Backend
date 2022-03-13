import { Router } from 'express';
import { create } from '../../handlers/user';

const routes = Router();

routes.post('/', create);

export default routes;
