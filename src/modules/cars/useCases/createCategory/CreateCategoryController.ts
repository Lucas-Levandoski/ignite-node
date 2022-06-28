import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';


export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    let category;

    try {
      await createCategoryUseCase.execute({ name, description }).then(result => {
        category = result;
      });
    } catch (e) {
      return res.status(400).json({ error: `category name '${name}' already exists` });
    }

    return res.status(201).json(category);
  }
}