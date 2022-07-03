import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { password, email } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const response = await authenticateUserUseCase.execute({ password, email });
    return res.status(200).json(response);
  }
}