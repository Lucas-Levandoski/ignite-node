import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';


export class CreateCarSpecificationController {

  async handle(req: Request, res: Response): Promise<void> {
    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);
    const { car_id, specifications_id } = req.body;

    await createCarSpecificationUseCase.execute({ car_id, specifications_id });

    throw new Error();
  }
}