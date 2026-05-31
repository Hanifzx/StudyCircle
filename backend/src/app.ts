import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';
import groupsRoutes from './modules/groups/groups.routes';
import { sessionsRouter } from './modules/sessions/sessions.routes';
import { materialsRouter } from './modules/materials/materials.routes';

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/groups', groupsRoutes);
app.use('/api/v1/sessions', sessionsRouter);
app.use('/api/v1/materials', materialsRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
