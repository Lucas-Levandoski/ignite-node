import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/implementations/ISpecificationsRepository';


export class ListSpecificationsUseCase {

  constructor(private specificationRepository: ISpecificationsRepository) { }

  async execute(): Promise<Specification[]> {
    return await this.specificationRepository.list().then(specification => (specification));
  }
}