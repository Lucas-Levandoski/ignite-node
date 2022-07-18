import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUseCase } from './CreateRentalUseCase';





export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { userId, carId, expectedReturnDate } = req.body;
    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    await createRentalUseCase.execute({ userId, carId, expectedReturnDate });

    return res.status(201).json({});
  }
}