import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken)
    throw new Error('missing token inside header');

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, 'cc862772bd3a95d82d2edda0c0a82d1a') as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);

    if (!user)
      throw new Error('user does not exist');

    next();

  } catch {
    throw new Error('invalid token');
  }
}