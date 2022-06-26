import { DataSource, Repository } from 'typeorm';
import { Specification } from '../entities/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from './implementations/ISpecificationsRepository';
import PostgresDataSource from '../../../database';


export class SpecificationsRepository implements ISpecificationsRepository {
  private static INSTANCE: SpecificationsRepository;
  private repository: Repository<Specification>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Specification);
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository(PostgresDataSource);
    }

    return SpecificationsRepository.INSTANCE;
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