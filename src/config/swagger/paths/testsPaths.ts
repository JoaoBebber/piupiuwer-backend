import { OpenAPIV3 } from 'openapi-types';

const testsPaths: OpenAPIV3.PathsObject = {
  '/tests': {
    get: {
      summary: 'Testar conexão',
      description: 'Documentação de como testar a conexão com a API.',
      tags: ['Tests'],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                properties: {
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

export default testsPaths;
