import { Category } from '../entities/Category';
import { ICreateCategoryDTO } from './implementations/CategoriesRepository';


export interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  list(): Promise<Category[]>;
}
