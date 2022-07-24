import { Router } from 'express';
import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const authenticateRoutes = Router();

authenticateRoutes.post('/', new AuthenticateUserController().handle);
authenticateRoutes.get('/refresh-token', new RefreshTokenController().handle);

export { authenticateRoutes };