import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';


export class CreateCarSpecificationController {

  async handle(req: Request, res: Response): Promise<Response> {
    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);
    const { carId, specificationsId } = req.body;

    const car = await createCarSpecificationUseCase.execute({ carId, specificationsId });

    return res.status(201).json(car);
  }
}