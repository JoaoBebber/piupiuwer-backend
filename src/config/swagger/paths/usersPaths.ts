import { OpenAPIV3 } from 'openapi-types';

import usersComponent from '../schemas/usersComponent';

export const usersPaths: OpenAPIV3.PathsObject = {
  '/users': {
    post: {
      summary: 'Criar usuário',
      description: 'Documentação de como criar um novo usuário.',
      tags: ['Users'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                first_name: {
                  type: 'string',
                },
                last_name: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                username: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
                about: {
                  type: 'string',
                  nullable: true,
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Created',
          content: {
            'application/json': {
              schema: {
                ...usersComponent?.User,
              },
            },
          },
        },
        400: {
          description: 'Bad Request',
        },
      },
    },
  },
};

export default usersPaths;
