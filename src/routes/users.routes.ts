import { Router } from 'express';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

usersRoutes.post('/', new CreateUserController().handle);

usersRoutes.patch('/avatar', uploadAvatar.single('avatar'), ensureAuthenticated, new UpdateUserAvatarController().handle);

export { usersRoutes };