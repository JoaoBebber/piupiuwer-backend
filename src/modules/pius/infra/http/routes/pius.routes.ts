import { Router } from 'express';

import PiusController from '../controllers/PiusController';

const piusRouter = Router();

const piusController = new PiusController();

// General Requests
piusRouter.post('/', piusController.create);
piusRouter.get('/', piusController.list);

// Favorite Requests
piusRouter.post('/favorite', piusController.favorite);

// Like Requests
piusRouter.post('/like', piusController.like);

export default piusRouter;
