import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';

import { ensureAdmin } from '@middlewares/ensureAdmin';

const specificationsRoutes = Router();

specificationsRoutes.post('/', ensureAdmin, new CreateSpecificationController().handle);

specificationsRoutes.get('/', new ListSpecificationsController().handle);

export { specificationsRoutes };