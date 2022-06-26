import { Category } from "../../models/Category";
import { ICreateCategoryDTO } from "../CategoriesRepository";


export interface ICategoriesRepository {
  findByName(name: string): Category | undefined;
  create({name, description}: ICreateCategoryDTO): Category;
  list(): Category[];
}
