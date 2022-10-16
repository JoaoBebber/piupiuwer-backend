import { OpenAPIV3 } from 'openapi-types';

export const exempleSchema: OpenAPIV3.PathsObject = {
  '/example': {
    get: {
      summary: 'Exemplo',
      description: 'Documentação de exemplo',
      tags: ['Exemplos'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                example: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Erro 401',
        },
        400: {
          description: 'Erro 400',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                properties: {
                  example: {
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

export default exempleSchema;
