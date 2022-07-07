import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICreateCategoryDTO } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';


export interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  list(): Promise<Category[]>;
}
