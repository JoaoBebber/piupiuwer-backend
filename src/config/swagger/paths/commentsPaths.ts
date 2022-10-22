import { OpenAPIV3 } from 'openapi-types';

import commentsComponent from '../schemas/commentsComponent';

const commentsPaths: OpenAPIV3.PathsObject = {
  '/comments': {
    post: {
      summary: 'Criar comentário',
      description: 'Documentação de como criar um novo comentário.',
      tags: ['Comments'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                piuId: {
                  type: 'string',
                },
                content: {
                  type: 'string',
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
                ...commentsComponent?.Comment,
              },
            },
          },
        },
        400: {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: {
                properties: {
                  status: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                properties: {
                  status: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default commentsPaths;
