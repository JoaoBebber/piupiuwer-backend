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
                  minLength: 1,
                  maxLength: 140,
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
    delete: {
      summary: 'Apagar Piu',
      description: 'Documentação de como apagar um Piu.',
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
                piuId: {
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
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                    },
                    authorId: {
                      type: 'string',
                    },
                    content: {
                      type: 'string',
                    },
                    created_at: {
                      type: 'string',
                    },
                    updated_at: {
                      type: 'string',
                    },
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
        404: {
          description: 'Not Found',
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
    get: {
      summary: 'Listar Pius',
      description: 'Documentação de como listar todos os Pius.',
      tags: ['Pius'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                    },
                    authorId: {
                      type: 'string',
                    },
                    content: {
                      type: 'string',
                    },
                    created_at: {
                      type: 'string',
                    },
                    updated_at: {
                      type: 'string',
                    },
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
  '/pius/favorite': {
    post: {
      summary: 'Favoritar ou Desfavoritar Piu',
      description: 'Documentação de como favoritar e desfavoritar um Piu. Note: Caso o Piu esteja favoritado, esse request irá desfavoritá-lo.',
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
                piuId: {
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
                  operation: {
                    type: 'string',
                  },
                  piu: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      authorId: {
                        type: 'string',
                      },
                      content: {
                        type: 'string',
                      },
                      created_at: {
                        type: 'string',
                      },
                      updated_at: {
                        type: 'string',
                      },
                    },
                  },
                },
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
  '/pius/like': {
    post: {
      summary: 'Curtir ou Descurtir Piu',
      description: 'Documentação de como curtir e descurtir um Piu. Note: Caso o Piu esteja curtido, esse request irá descurti-lo.',
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
                piuId: {
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
                  operation: {
                    type: 'string',
                  },
                  piu: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      authorId: {
                        type: 'string',
                      },
                      content: {
                        type: 'string',
                      },
                      created_at: {
                        type: 'string',
                      },
                      updated_at: {
                        type: 'string',
                      },
                    },
                  },
                },
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

export default piusPaths;
