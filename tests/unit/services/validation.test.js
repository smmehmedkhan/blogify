import { describe, test, expect } from '@jest/globals';
import ValidationService from '../../../services/validation.service.js';

describe('Validation Service', () => {
  test('should validate correct email', () => {
    expect(ValidationService.validateEmail('test@example.com').isValid).toBe(
      true,
    );
    expect(ValidationService.validateEmail('invalid-email').isValid).toBe(
      false,
    );
  });

  test('should validate password strength', () => {
    expect(ValidationService.validatePassword('StrongPass123!').isValid).toBe(
      true,
    );
    expect(ValidationService.validatePassword('weak').isValid).toBe(false);
  });
});
