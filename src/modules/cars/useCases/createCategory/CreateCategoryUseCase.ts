import { Category } from "../../models/Category";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {  
  constructor( private categoriesRepository: CategoriesRepository ) { }

  execute({name, description}: IRequest): Category {
    const categoryExists = this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new Error("Category already exists");
    }

    this.categoriesRepository.create({ name, description }); 

    return new Category(name, description);
  }
};
