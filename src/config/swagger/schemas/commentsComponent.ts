import { OpenAPIV3 } from 'openapi-types';

const commentsComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  Comment: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      authorId: {
        type: 'string',
      },
      piuId: {
        type: 'string',
      },
      content: {
        type: 'string',
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

export default commentsComponent;
