import { inject, injectable } from 'tsyringe';
import { AppError } from '@errors/AppError';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {

  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) { }

  async execute({ name, description }: IRequest): Promise<Specification> {
    let specificationExists;
    await this.specificationRepository.findByName(name).then(result => {
      specificationExists = Boolean(result);
    });

    if (specificationExists) {
      throw new AppError('Specification already exists', 404);
    }

    return await this.specificationRepository.create({ name, description });
  }
}