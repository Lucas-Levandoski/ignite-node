import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './createUserUseCase';

export class CreateUserController {
  handle(req: Request, res: Response) {
    const { name, username, password, email, driverLicense } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    createUserUseCase.execute({ name, username, password, email, driverLicense });

    return res.status(201).json({});
  }
}