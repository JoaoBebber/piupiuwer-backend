import { Router } from 'express';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

// Users
routes.use('', usersRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
