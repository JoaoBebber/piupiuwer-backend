import { Router } from 'express';

import PiusController from '../controllers/PiusController';

const piusRouter = Router();

const piusController = new PiusController();

piusRouter.post('/', piusController.create);
piusRouter.get('/', piusController.list);

export default piusRouter;
