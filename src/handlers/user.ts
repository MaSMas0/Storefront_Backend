import { Request, Response } from 'express';
import { User, UserOperation } from '../models/user';

const u_Operation = new UserOperation();

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      email: req.body.email,
      password_digest: req.body.password_digest
    };
    const newUser = await u_Operation.create(user);
    res.json(newUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await u_Operation.delete(req.body.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export { create, destroy };
