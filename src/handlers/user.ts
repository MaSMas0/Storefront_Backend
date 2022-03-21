import { Request, Response } from 'express';
import { User, UserOperation } from '../models/user';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../database';

const u_Operation = new UserOperation();

const create = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const newUser = await u_Operation.create(user);
    const token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
    res.json({ userData: newUser, Token: token });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const deletedUser = await u_Operation.delete(req.body.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const users_Indexed = await u_Operation.index();
    res.json(users_Indexed);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const show_User = await u_Operation.show(
      req.params.id as unknown as number
    );
    res.json(show_User);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      email: req.body.email,
      password_digest: req.body.password_digest,
      id: parseInt(req.params.id, 10)
    } as User;
    const updatedUser = await u_Operation.update(user);
    res.json(updatedUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const authenticate = async (req: Request, res: Response) => {
  const user = {
    email: req.body.email as string,
    password_digest: req.body.password_digest as string
  };
  try {
    const u = await u_Operation.authenticate(user.email, user.password_digest);
    const token = jwt.sign({ u }, TOKEN_SECRET as string);
    res.json({ ...u, token });
  } catch (error) {
    res.status(401);
    res.json({
      error: `either username or password has been put wrong please try again `
    });
  }
};

export { create, destroy, index, show, update, authenticate };
