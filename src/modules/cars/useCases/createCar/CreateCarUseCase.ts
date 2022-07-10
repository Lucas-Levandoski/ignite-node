import { AppError } from '@errors/AppError';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
}

@injectable()
export class CreateCarUseCase {

  constructor(
    @inject('CarsRepository')
    private carsRepository: CarsRepository
  ) { }

  async execute(data: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findByLicensePlate(data.licensePlate);

    if (carExists)
      throw new AppError('license plate already registered', 400);

    return await this.carsRepository.create(data);
  }

}