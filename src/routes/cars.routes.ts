import { Router } from 'express';
import multer from 'multer';

import { ensureAdmin } from '@middlewares/ensureAdmin';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';

const carsRoutes = Router();

const upload = multer({
  dest: './tmp',
});

carsRoutes.post('/', ensureAdmin, new CreateCarController().handle);
carsRoutes.get('/', new ListCarsController().handle);
carsRoutes.post('/specification', ensureAdmin, new CreateCarSpecificationController().handle);
carsRoutes.post('/image', ensureAdmin, upload.array('images'), new UploadCarImageController().handle);

export { carsRoutes };