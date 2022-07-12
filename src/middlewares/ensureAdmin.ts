import { NextFunction, Request, Response } from 'express';
import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user?.isAdmin)
    throw new AppError('this user is not an administrator', 401);

  req.user = { id: user.id };

  next();
}