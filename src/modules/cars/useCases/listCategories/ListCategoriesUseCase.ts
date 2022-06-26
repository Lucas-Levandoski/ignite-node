import { Category } from '../../entities/Category';
import { CategoriesRepository } from '../../repositories/CategoriesRepository';


export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) { }

  async execute(): Promise<Category[]> {
    return await this.categoriesRepository.list().then(categories => (categories));
  }
}