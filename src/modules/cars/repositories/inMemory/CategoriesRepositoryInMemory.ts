import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ICreateCategoryDTO } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';


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