import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../../app.js';

describe('Auth Routes', () => {
  test('GET /auth/sign-in should return signin page', async () => {
    const response = await request(app).get('/auth/sign-in');
    expect(response.status).toBe(200);
  });

  test('POST /auth/sign-in with invalid data should fail', async () => {
    const response = await request(app)
      .post('/auth/sign-in')
      .send({ email: 'invalid', password: 'short' });

    expect(response.status).toBe(400);
  });
});
