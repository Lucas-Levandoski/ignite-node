import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';

import { ensureAdmin } from '@middlewares/ensureAdmin';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});


categoriesRoutes.post('/', ensureAdmin, new CreateCategoryController().handle);

categoriesRoutes.get('/', new ListCategoriesController().handle);

categoriesRoutes.post('/import', ensureAdmin, upload.single('file'), new ImportCategoryController().handle);

export { categoriesRoutes };