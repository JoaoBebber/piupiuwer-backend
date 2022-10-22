import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

// Pius
import piusRoutes from '@modules/pius/infra/http/routes/pius.routes';

// Comments
import commentsRoutes from '@modules/comments/infra/http/routes/comments.routes';

const routes = Router();

// Users
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

// Pius
routes.use('/pius', ensureAuthenticated, piusRoutes);

// Comments
routes.use('/comments', ensureAuthenticated, commentsRoutes);

export default routes;
