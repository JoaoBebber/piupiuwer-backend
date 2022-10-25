import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/multerS3';

import UsersController from '../controller/UsersController';
import UserAvatarController from '../controller/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

// General Requests
usersRouter.post('/', usersController.create);
usersRouter.get('/', ensureAuthenticated, usersController.list);

// User's Avatar Requests
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

// Follow Requests
usersRouter.post('/follow', ensureAuthenticated, usersController.follow);

export default usersRouter;
