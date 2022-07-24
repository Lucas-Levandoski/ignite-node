import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const secretRefreshToken = process.env.SECRET_REFRESH_TOKEN ?? 'random string';
  const authToken = req.headers.authorization;

  if (!authToken)
    throw new AppError('missing token inside header', 404);

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, secretRefreshToken) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);

    if (!user)
      throw new AppError('user does not exist', 401);

    req.user = { id: user.id };

    next();

  } catch {
    throw new AppError('invalid token', 401);
  }
}