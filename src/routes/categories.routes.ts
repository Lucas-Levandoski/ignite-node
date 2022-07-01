import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});


categoriesRoutes.post('/', new CreateCategoryController().handle);

categoriesRoutes.get('/', ensureAuthenticated, new ListCategoriesController().handle);

categoriesRoutes.post('/import', upload.single('file'), new ImportCategoryController().handle);

export { categoriesRoutes };