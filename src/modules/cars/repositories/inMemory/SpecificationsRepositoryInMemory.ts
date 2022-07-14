import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from '../ISpecificationsRepository';


export class SpecificationsRepositoryInMemory implements ISpecificationsRepository {

  specifications: Specification[] = [];

  async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    throw new Error();
  }

  async findByName(name: string): Promise<Category | null> {
    const specifications = this.specifications.find(specification => specification.name === name);
    return specifications ? specifications : null;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    throw new Error();
  }

  async list(): Promise<Specification[]> {
    throw new Error();
  }

}