import { Router } from 'express';
import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

authenticateRoutes.post('/', new AuthenticateUserController().handle);

export { authenticateRoutes };