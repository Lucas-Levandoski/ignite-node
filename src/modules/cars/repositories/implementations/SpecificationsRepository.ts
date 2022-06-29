import { Repository } from 'typeorm';
import { Specification } from '../../entities/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from '../ISpecificationsRepository';
import PostgresDataSource from '../../../../database';


export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name
    });

    return await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification | null> {
    return await this.repository.findOne({
      where: {
        name
      }
    });
  }

  async list(): Promise<Specification[]> {
    return await this.repository.find();
  }
}