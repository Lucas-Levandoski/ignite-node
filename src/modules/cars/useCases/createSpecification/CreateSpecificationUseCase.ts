import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/implementations/ISpecificationsRepository';


interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {

  constructor(private specificationRepository: ISpecificationsRepository) { }

  execute({ name, description }: IRequest): Specification {
    const categoryExists = this.specificationRepository.findByName(name);

    if (categoryExists) {
      throw new Error('Category already exists');
    }

    this.specificationRepository.create({ name, description });

    return new Specification(name, description);
  }

}