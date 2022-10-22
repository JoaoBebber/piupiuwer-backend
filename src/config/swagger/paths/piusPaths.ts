import { OpenAPIV3 } from 'openapi-types';

import piusComponent from '../schemas/piusComponent';

const piusPaths: OpenAPIV3.PathsObject = {
  '/pius': {
    post: {
      summary: 'Criar Piu',
      description: 'Documentação de como criar um novo Piu.',
      tags: ['Pius'],
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
                ...piusComponent?.Piu,
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

export default piusPaths;
