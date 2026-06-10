import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Definisi Swagger/OpenAPI options
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StudyCircle API Documentation',
      version: '1.0.0',
      description: 'API Documentation untuk StudyCircle - Platform Koordinasi Study Group Bertenaga AI',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
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
    paths: {
      '/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'Login User',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'mahasiswa@unhas.ac.id' },
                    password: { type: 'string', example: 'password123' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login berhasil, mengatur cookie token.' },
            401: { description: 'Kredensial tidak valid' },
          },
        },
      },
      '/match/groups/recommendations': {
        get: {
          tags: ['AI Matching'],
          summary: 'Mendapatkan Rekomendasi Grup',
          description: 'Menggunakan algoritma heuristik untuk mencocokkan user dengan grup berdasarkan Learning Style dan Timezone.',
          responses: {
            200: {
              description: 'Daftar grup yang direkomendasikan beserta matchScore',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            matchScore: { type: 'number' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/sessions/optimal-schedule': {
        post: {
          tags: ['AI Scheduling'],
          summary: 'Dapatkan Saran Jadwal Optimal',
          description: 'Menghitung waktu paling optimal bagi seluruh anggota grup berdasarkan timezone.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    groupId: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Mengembalikan daftar jadwal yang direkomendasikan',
            },
          },
        },
      },
      '/groups': {
        get: {
          tags: ['Groups'],
          summary: 'Ambil Daftar Grup',
          responses: {
            200: { description: 'Sukses' },
          },
        },
        post: {
          tags: ['Groups'],
          summary: 'Buat Grup Baru',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Web Programming A' },
                    subject: { type: 'string', example: 'Computer Science' },
                    description: { type: 'string' },
                    maxCapacity: { type: 'number', example: 5 },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Grup berhasil dibuat' },
          },
        },
      },
    },
  },
  // Path ke file routing jika ingin JSDoc otomatis (dikosongkan karena menggunakan manual paths)
  apis: [], 
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  // CSS khusus untuk membuat Swagger UI terlihat lebih rapi
  const customCss = `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #3b82f6 }
  `;
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss,
    customSiteTitle: 'StudyCircle API Docs'
  }));
};
