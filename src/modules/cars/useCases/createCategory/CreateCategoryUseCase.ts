import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) { }

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
