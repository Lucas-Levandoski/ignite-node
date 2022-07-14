import { AppError } from '@errors/AppError';
import { ICreateCarSpecificationDTO } from '@modules/cars/dtos/ICreateCarSpecificationDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { inject, injectable } from 'tsyringe';



@injectable()
export class CreateCarSpecificationUseCase {

  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) { }

  async execute({ car_id, specifications_id }: ICreateCarSpecificationDTO): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) throw new AppError('this car does not exist', 400);

    carExists.specifications = await this.specificationsRepository.findByIds(specifications_id);

    this.carsRepository.create(carExists);
  }
}