import { Request, Response } from 'express';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';


export class ListSpecificationsController {

  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) { }

  async handle(req: Request, res: Response) {
    const specification = await this.listSpecificationsUseCase.execute().then(specification => (specification));

    return res.status(200).json(specification);
  }

}