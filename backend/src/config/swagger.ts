import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import swaggerDocument from './swagger-output.json';

export const setupSwagger = (app: Express) => {
  // CSS khusus untuk membuat Swagger UI terlihat lebih rapi
  const customCss = `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #3b82f6 }
  `;
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss,
    customSiteTitle: 'StudyCircle API Docs'
  }));
};
