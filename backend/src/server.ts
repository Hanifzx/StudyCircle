import http from 'http';
import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';
import { socketService } from './socket';

const server = http.createServer(app);

// Initialize Socket.io
socketService.initialize(server);

const startServer = () => {
  server.listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT}`);
  });
};

startServer();
