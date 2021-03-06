import { Repository } from 'typeorm';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import PostgresDataSource from '@database/index';

// DTO = Data Transfer Object
export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Category);
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
