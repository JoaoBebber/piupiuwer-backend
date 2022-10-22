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
    get: {
      summary: 'Listar usuários',
      description: 'Documentação de como listar todos os usuários.',
      tags: ['Users'],
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
                    about: {
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
  '/users/follow': {
    post: {
      summary: 'Seguir ou deixar de seguir usuário',
      description: 'Documentação de como seguir e deixar de seguir um usuário. Note: Caso o usuário esteja sendo seguido, esse request irá deixar de segui-lo.',
      tags: ['Users'],
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
                followingId: {
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
                  status: {
                    type: 'string',
                  },
                  user: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
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
                      about: {
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

export default usersPaths;
