import { inject, injectable } from 'tsyringe';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

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
      throw new Error('Specification already exists');
    }

    return await this.specificationRepository.create({ name, description });
  }
}