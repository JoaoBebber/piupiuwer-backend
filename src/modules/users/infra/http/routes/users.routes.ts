import { Router } from 'express';

import UsersController from '../controller/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/register', usersController.create);
usersRouter.get('/', ensureAuthenticated, usersController.list);

export default usersRouter;
