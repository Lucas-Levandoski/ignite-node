import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImageUseCase } from './UploadCarImageUseCase';


export class UploadCarImageController {

  async handle(req: Request, res: Response): Promise<Response> {
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);
    const { carId, imageNames } = req.body;

    await uploadCarImageUseCase.execute(carId, imageNames);

    return res.status(201).json({ message: 'car image created' });
  }
}