import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController {



  async handle(req: Request, res: Response): Promise<void> {
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    await refreshTokenUseCase.execute();

    return;
  }
}