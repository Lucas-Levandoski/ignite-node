import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { password, email } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    let response;

    try {
      response = await authenticateUserUseCase.execute({ password, email });
    } catch (e) {
      return res.status(400).send('email already registered');
    }

    return res.status(200).json(response);
  }
}