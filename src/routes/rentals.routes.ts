import { Router } from 'express';

import { ensureAdmin } from '@middlewares/ensureAdmin';
import { CreateRentalController } from '@modules/cars/useCases/createRental/CreateRentalController';

const rentalsRoutes = Router();

rentalsRoutes.post('/', ensureAdmin, new CreateRentalController().handle);

export { rentalsRoutes };