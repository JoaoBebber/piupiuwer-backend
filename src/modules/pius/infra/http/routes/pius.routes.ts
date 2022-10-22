import { Router } from 'express';

import PiusController from '../controllers/PiusController';

const piusRouter = Router();

const piusController = new PiusController();

piusRouter.post('/', piusController.create);
piusRouter.get('/', piusController.list);
piusRouter.post('/like', piusController.like);

export default piusRouter;
