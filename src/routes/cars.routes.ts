import { Router } from 'express';

import { ensureAdmin } from '@middlewares/ensureAdmin';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';

const carsRoutes = Router();

carsRoutes.post('/', ensureAdmin, new CreateCarController().handle);
carsRoutes.get('/', new ListCarsController().handle);
carsRoutes.post('/specification', ensureAdmin, new CreateCarSpecificationController().handle);
carsRoutes.post('/image', ensureAdmin, new UploadCarImageController().handle);

export { carsRoutes };