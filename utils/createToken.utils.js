import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../.configs/env.js';

/**
 * @name Token
 *  @description Create a token using JsonWebToken for 30 day.
 */
export default function createToken(_id) {
  // Create a token for 30 days
  const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: '30d' });

  return token;
}
