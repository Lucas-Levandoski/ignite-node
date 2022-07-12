import { AppError } from '@errors/AppError';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class ListCarsUseCase {

  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) { }

  async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable();

    return cars;
  }
}