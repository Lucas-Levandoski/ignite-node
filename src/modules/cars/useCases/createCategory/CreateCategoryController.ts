import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';


export class CreateCategoryController {

  constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

  async handle(req: Request, res: Response) {
    const { name, description } = req.body;
    let category;

    try {
      await this.createCategoryUseCase.execute({ name, description }).then(result => {
        category = result;
      });
    } catch (e) {
      return res.status(400).json({ error: `category name '${name}' already exists` });
    }

    return res.status(201).json(category);
  }
}