import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/cars/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';


interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}


@injectable()
export class CreateRentalUseCase {

  constructor(
    @inject('RentalsRepository')
    private repository: IRentalsRepository,
  ) { }

  async execute(data: IRequest): Promise<void> {


    throw new Error();
  }
}