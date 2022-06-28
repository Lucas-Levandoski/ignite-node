import fs from 'fs';
import { parse } from 'csv-parse';
import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IImportCategory {
  name: string;
  description: string;
}


@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository
  ) { }

  private loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);

      const parseFile = parse();

      stream.pipe(parseFile)
        .on('data', (data) => {
          const [name, description] = data;
          categories.push({ name, description });
        })
        .on('end', () => {
          resolve(categories);
          fs.promises.unlink(file.path);
        })
        .on('error', (err) => {
          reject(err);
        });

    });
  }



  execute(file: Express.Multer.File) {
    this.loadCategories(file).then((categories) => {
      categories.forEach(category => {
        if (!this.categoriesRepository.findByName(category.name))
          this.categoriesRepository.create(category);
      });
    });
  }
}