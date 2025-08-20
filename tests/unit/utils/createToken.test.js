import { describe, test, expect } from '@jest/globals';
import createToken from '../../../utils/createToken.utils.js';

describe('createToken', () => {
  test('should create a valid JWT token', () => {
    const payload = { userId: '123', email: 'test@example.com' };
    const token = createToken(payload);

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });
});
