import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  handle(req: Request, res: Response) {
    const { name, password, email, driverLicense } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      createUserUseCase.execute({ name, password, email, driverLicense });
    } catch (e) {
      return res.status(400).send('email already registered');
    }

    return res.status(201).json({});
  }
}