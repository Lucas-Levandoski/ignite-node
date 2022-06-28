import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';


export class ImportCategoryController {
  handle(req: Request, res: Response): Response {
    const { file } = req;
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    if (file)
      importCategoryUseCase.execute(file);

    return res.send('ok ok');
  }
}