import { Category } from '../../entities/Category';
import { CategoriesRepository } from '../../repositories/CategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) { }

  async execute({ name, description }: IRequest): Promise<Category> {
    let categoryExists;

    await this.categoriesRepository.findByName(name).then(result => {
      categoryExists = Boolean(result);
    });

    if (categoryExists) {
      throw new Error('Category already exists');
    }

    return await this.categoriesRepository.create({ name, description });
  }
}
