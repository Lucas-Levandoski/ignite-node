import { AppError } from '../../../../errors/AppError';
import { CategoriesRepositoryInMemory } from '../../repositories/inMemory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';


let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('create category use case', () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should create a new category', async () => {
    const category = {
      name: 'category name',
      description: 'category description'
    };

    const newCategory = await createCategoryUseCase.execute(category);

    const categoryFound = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryFound).toEqual(newCategory);
  });

  it('should throw AppError when creating two categories with the same name', async () => {
    expect(async () => {
      const category = {
        name: 'category name',
        description: 'category description'
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
