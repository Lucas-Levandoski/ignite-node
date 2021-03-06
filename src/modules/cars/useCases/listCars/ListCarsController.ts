import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCarsUseCase } from './ListCarsUseCase';


export class ListCarsController {

  async handle(req: Request, res: Response): Promise<Response> {
    const listCarsUseCase = container.resolve(ListCarsUseCase);

    const cars = await listCarsUseCase.execute();

    return res.status(200).json(cars);
  }
}