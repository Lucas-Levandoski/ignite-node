import { Router } from 'express';
import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';
import { SendForgotPasswordController } from '@modules/accounts/useCases/sendForgotPassword/sendForgotPasswordController';

const authenticateRoutes = Router();

authenticateRoutes.post('/', new AuthenticateUserController().handle);
authenticateRoutes.post('/refresh-token', new RefreshTokenController().handle);
authenticateRoutes.post('/recover-password', new SendForgotPasswordController().handle);

export { authenticateRoutes };