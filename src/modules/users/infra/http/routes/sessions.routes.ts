import { Router } from 'express';

import SessionsController from '../controller/SessionsController';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

// General Requests
sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
