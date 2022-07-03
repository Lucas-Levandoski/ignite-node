import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  handle(req: Request, res: Response) {
    const { name, password, email, driverLicense } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    createUserUseCase.execute({ name, password, email, driverLicense });

    return res.status(201).json({ message: `user ${name} successfully created` });
  }
}