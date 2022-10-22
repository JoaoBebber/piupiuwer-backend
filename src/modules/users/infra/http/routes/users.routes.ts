import { Router } from 'express';

import UsersController from '../controller/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const usersController = new UsersController();

// General Requests
usersRouter.post('/', usersController.create);
usersRouter.get('/', ensureAuthenticated, usersController.list);

// Follow Requests
usersRouter.post('/follow', ensureAuthenticated, usersController.follow);

export default usersRouter;
