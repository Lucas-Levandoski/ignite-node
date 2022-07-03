import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';

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

    const category = await this.categoriesRepository.findByName(name);

    if (category) {
      throw new AppError('Category already exists', 404);
    }

    return await this.categoriesRepository.create({ name, description });
  }
}
