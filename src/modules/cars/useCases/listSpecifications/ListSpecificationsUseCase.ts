import { inject, injectable } from 'tsyringe';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

@injectable()
export class ListSpecificationsUseCase {

  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) { }

  async execute(): Promise<Specification[]> {
    return await this.specificationRepository.list().then(specification => (specification));
  }
}