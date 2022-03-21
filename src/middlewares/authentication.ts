import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../database';

export const BearerTokenVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader = req.headers.authorization;
    // Authorization =  Bearer <Token>
    if (typeof bearerHeader !== 'undefined') {
      const token = (bearerHeader as string).split(' ')[1];
      jwt.verify(token, TOKEN_SECRET as string);
      next();
    }
  } catch (error) {
    res.status(403);
    res.json({ err: 'Access denied, invalid token' });
  }
};
