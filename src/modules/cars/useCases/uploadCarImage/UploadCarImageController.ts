import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFiles {
  filename: string;
}

export class UploadCarImageController {

  async handle(req: Request, res: Response): Promise<Response> {
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);
    const { carId } = req.params;
    const imageNames = (req.files as IFiles[]).map(file => file.filename);

    await uploadCarImageUseCase.execute(carId, imageNames);

    return res.status(201).json({ message: 'car image created' });
  }
}