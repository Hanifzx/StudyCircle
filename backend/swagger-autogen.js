const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
  info: {
    title: 'StudyCircle API Documentation',
    description: 'API Documentation lengkap untuk StudyCircle - Platform Koordinasi Study Group Bertenaga AI',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development Server',
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
        description: 'JWT token dikirim melalui HTTP-Only cookie',
      },
    },
  },
  security: [
    {
      cookieAuth: [],
    },
  ],
};

const outputFile = './src/config/swagger-output.json';
const routes = ['./src/app.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc).then(() => {
    console.log("Swagger generated completely");
});
