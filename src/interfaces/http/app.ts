import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error-handler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Placeholder for routes - will be moved to a separate file later
// app.use('/api', apiRoutes);

// Error handler must be the last middleware
const finalizeApp = (app: express.Express) => {
  app.use(errorHandler);
};

export { app, finalizeApp };
