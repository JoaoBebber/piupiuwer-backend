import { OpenAPIV3 } from 'openapi-types';

import usersComponent from '../schemas/usersComponent';

const sessionsPaths: OpenAPIV3.PathsObject = {
  '/sessions': {
    post: {
      summary: 'Fazer login',
      description: 'Documentação de como criar uma sessão.',
      tags: ['Sessions'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                properties: {
                  user: {
                    ...usersComponent?.User,
                  },
                  token: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
        },
      },
    },
  },
};

export default sessionsPaths;
