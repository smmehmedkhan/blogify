import { rateLimit, ipKeyGenerator } from 'express-rate-limit';

// 1. Authentication Rate Limiters
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  skipSuccessfulRequests: true,
  keyGenerator: (req) =>
    `login-${ipKeyGenerator(req)}-${req.body.email || 'anonymous'}`,
  message: {
    error: 'Too many login attempts, please try again after 15 minutes',
  },
});

export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 signups per hour per IP
  message: {
    error: 'Too many signup attempts, please try again after an hour',
  },
});

export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 password reset requests per hour
  keyGenerator: (req) =>
    `reset-${ipKeyGenerator(req)}-${req.body.email || 'anonymous'}`,
  message: {
    error: 'Too many password reset requests, please try again after an hour',
  },
});

// 2. Content Creation Rate Limiters
export const postCreationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 posts per hour per user
  keyGenerator: (req) => `post-${req.user?.id || ipKeyGenerator(req)}`,
  message: { error: 'Too many posts created, please slow down' },
});

export const commentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20, // 20 comments per 10 minutes
  keyGenerator: (req) => `comment-${req.user?.id || ipKeyGenerator(req)}`,
  message: { error: 'Too many comments, please wait before commenting again' },
});

// 3. Social Interaction Rate Limiters
export const likeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 likes per minute (prevent spam clicking)
  keyGenerator: (req) => `like-${req.user?.id || ipKeyGenerator(req)}`,
  message: { error: 'Too many like/dislike actions, please slow down' },
});

export const followLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 follow/unfollow actions every 15 minutes
  keyGenerator: (req) => `follow-${req.user?.id || ipKeyGenerator(req)}`,
  message: { error: 'Too many follow actions, please try again later' },
});

// 4. Contact & Communication Rate Limiters
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 contact messages per 15 minutes
  keyGenerator: (req) =>
    `contact-${ipKeyGenerator(req)}-${req.body.email || 'anonymous'}`,
  message: { error: 'Too many contact messages, please try again later' },
});

// 5. File Upload Rate Limiters
export const imageUploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 image uploads per hour
  keyGenerator: (req) => `upload-${req.user?.id || ipKeyGenerator(req)}`,
  message: { error: 'Too many image uploads, please try again later' },
});

// 6. Search Rate Limiter
export const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 searches per minute
  keyGenerator: (req) => `search-${ipKeyGenerator(req)}`,
  message: { error: 'Too many search requests, please slow down' },
});

// 7. Profile Update Rate Limiter
export const profileUpdateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 profile updates per hour
  keyGenerator: (req) => `profile-${req.user?.id || ipKeyGenerator(req)}`,
  message: { error: 'Too many profile updates, please try again later' },
});

// 8. General API Rate Limiter
export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});
