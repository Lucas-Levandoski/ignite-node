import { AppError } from '@errors/AppError';
import { CarsImage } from '@modules/cars/infra/typeorm/entities/CarsImage';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class UploadCarImageUseCase {

  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImageRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) { }

  async execute(carId: string, imageName: string): Promise<CarsImage> {
    const carExists = this.carsRepository.findById(carId);

    if (!carExists) throw new AppError('this car does not exist', 400);

    const carsImage = await this.carsImagesRepository.create(carId, imageName);

    return carsImage;
  }
}