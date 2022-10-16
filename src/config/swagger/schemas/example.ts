import { OpenAPIV3 } from 'openapi-types';

const exempleComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  ComponentExample: {
    type: 'object',
    properties: {
      component: {
        type: 'string',
      },
    },
  },
};

export default exempleComponent;
