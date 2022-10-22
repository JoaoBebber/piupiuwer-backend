import { OpenAPIV3 } from 'openapi-types';

const usersComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        uniqueItems: true,
      },
      first_name: {
        type: 'string',
      },
      last_name: {
        type: 'string',
      },
      email: {
        type: 'string',
        uniqueItems: true,
      },
      username: {
        type: 'string',
        uniqueItems: true,
      },
      about: {
        type: 'string',
        nullable: true,
        maxLength: 140,
      },
      created_at: {
        type: 'string',
      },
      updated_at: {
        type: 'string',
      },
    },
  },
};

export default usersComponent;
