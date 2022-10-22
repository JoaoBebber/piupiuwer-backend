import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

// Pius
import piusRoutes from '@modules/pius/infra/http/routes/pius.routes';

const routes = Router();

// Users
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

// Pius
routes.use('/pius', ensureAuthenticated, piusRoutes);

export default routes;
