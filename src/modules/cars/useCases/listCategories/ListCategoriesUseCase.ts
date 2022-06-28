import { inject, injectable } from 'tsyringe';
import { Category } from '../../entities/Category';
import { CategoriesRepository } from '../../repositories/CategoriesRepository';


@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository
  ) { }

  async execute(): Promise<Category[]> {
    return await this.categoriesRepository.list().then(categories => (categories));
  }
}