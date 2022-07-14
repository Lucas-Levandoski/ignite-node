import { Repository, In } from 'typeorm';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import PostgresDataSource from '@database/index';


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

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findBy({ id: In(ids) });
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