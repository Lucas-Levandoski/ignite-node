import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordUseCase } from './sendForgotPasswordUseCase';


export class SendForgotPasswordController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordUseCase = container.resolve(SendForgotPasswordUseCase);

    await sendForgotPasswordUseCase.execute(email);

    return res.status(200).json({ message: 'email sent' });
  }
}