import { Category } from '../entities/Category';
import { ICategoriesRepository } from './implementations/ICategoriesRepository';

// DTO = Data Transfer Object
export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];
  private static INSTANCE: CategoriesRepository;

  constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category(name, description);

    this.categories.push(category);

    return category;
  }

  findByName(name: string): Category | undefined {
    return this.categories.find(category => category.name === name);
  }

  list(): Category[] {
    return this.categories;
  }
}
