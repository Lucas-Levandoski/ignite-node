import { AppError } from '@errors/AppError';
import { ICreateRentalDTO } from '@modules/cars/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/cars/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';
import dayjs from 'dayjs';




@injectable()
export class CreateRentalUseCase {

  constructor(
    @inject('RentalsRepository')
    private repository: IRentalsRepository,
  ) { }

  async execute(data: ICreateRentalDTO): Promise<void> {

    const carIsNotAvailable = await this.repository.findOpenRentalByCar(data.carId);

    if (carIsNotAvailable) throw new AppError('this car is not available', 400);

    await this.repository.create(data);
  }
}