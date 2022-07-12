import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ensureAdmin } from '@middlewares/ensureAdmin';

const carsRoutes = Router();

carsRoutes.post('/', ensureAdmin, new CreateCarController().handle);

export { carsRoutes };