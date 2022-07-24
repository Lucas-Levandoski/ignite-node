import { AppError } from '@errors/AppError';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController {

  async handle(req: Request, res: Response): Promise<void> {
    const bearer = req.headers.authorization;
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    if (!bearer) throw new AppError('missing user token', 401);

    const [, token] = bearer.split(' ');

    await refreshTokenUseCase.execute(token);

    return;
  }
}