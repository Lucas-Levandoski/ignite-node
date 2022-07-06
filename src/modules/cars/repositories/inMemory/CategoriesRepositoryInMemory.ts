import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';
import { ICreateCategoryDTO } from '../implementations/CategoriesRepository';


export class CategoriesRepositoryInMemory implements ICategoriesRepository {

  categories: Category[] = [];

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find(category => category.name === name);
    return category ? category : null;
  }

  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category(name, description);

    this.categories.push(category);

    return category;
  }

}