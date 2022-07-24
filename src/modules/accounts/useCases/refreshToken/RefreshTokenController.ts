import { AppError } from '@errors/AppError';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController {

  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token ||
      req.headers['x-access-token'] ||
      req.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    if (!token) throw new AppError('missing user token', 401);

    const refreshToken = await refreshTokenUseCase.execute(token);

    return res.status(200).json({ refreshToken });
  }
}