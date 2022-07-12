import { Router } from 'express';

import { ensureAdmin } from '@middlewares/ensureAdmin';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';

const carsRoutes = Router();

carsRoutes.post('/', ensureAdmin, new CreateCarController().handle);
carsRoutes.get('/', new ListCarsController().handle);

export { carsRoutes };