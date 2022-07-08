import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: number;
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

  async execute(data: IRequest): Promise<void> {
    this.carsRepository.create(data);
  }

}