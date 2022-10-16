import { OpenAPIV3 } from 'openapi-types';

import paths from './paths';
import schemas from './schemas';

const swagger: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'API do projeto XPTO',
    description: 'Documentação',
    contact: {
      email: 'email@polijunior.com.br',
    },
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3333/',
      description: 'Local server',
    },
    {
      url: 'https://sua-url.com/',
      description: 'Deployed server',
    },
  ],
  paths,
  components: {
    schemas,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export default swagger;
