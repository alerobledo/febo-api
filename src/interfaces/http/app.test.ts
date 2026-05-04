import request from 'supertest';
import { app, finalizeApp } from './app';
import { AppError } from '@/domain/errors/app-error';

describe('App', () => {
  describe('GET /health', () => {
    it('should return 200 and status ok', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
    });
  });

  describe('Error Handler', () => {
    beforeAll(() => {
      // Add test routes before finalizing the app
      app.get('/test-error', (req, res, next) => {
        next(new AppError('Test Error', 400));
      });

      app.get('/test-unexpected', (req, res, next) => {
        next(new Error('Unexpected Error'));
      });

      finalizeApp(app);
    });

    it('should handle AppError correctly', async () => {
      const response = await request(app).get('/test-error');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: 'error',
        message: 'Test Error',
      });
    });

    it('should handle unexpected errors as 500', async () => {
      const response = await request(app).get('/test-unexpected');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        status: 'error',
        message: 'Internal Server Error',
      });
    });
  });
});
