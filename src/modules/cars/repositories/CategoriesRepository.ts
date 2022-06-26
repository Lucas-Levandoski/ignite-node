import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/Category';
import { ICategoriesRepository } from './implementations/ICategoriesRepository';
import PostgresDataSource from '../../../database';

// DTO = Data Transfer Object
export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;
  private static INSTANCE: CategoriesRepository;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Category);
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository(PostgresDataSource);
    }

    return CategoriesRepository.INSTANCE;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      description,
      name
    });

    return await this.repository.save(category);
  }

  async findByName(name: string): Promise<Category | null> {

    return await this.repository.findOne({
      where: {
        name
      }
    });
  }

  async list(): Promise<Category[]> {
    return await this.repository.find();
  }
}
