import helmet from 'helmet';

/**
 * @name helmetMiddleware
 * @description { Helmet middleware with dynamic nonce support
 * CSP directives are updated per request using res.locals.nonce }
 */
export default function helmetMiddleware(_req, res, next) {
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          (_req, res) => `'nonce-${res.locals.nonce}'`,
          'https://kit.fontawesome.com',
          'https://cdn.jsdelivr.net',
          'https://unpkg.com',
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
          'https://ka-f.fontawesome.com',
          'https://cdn.jsdelivr.net',
          'https://unpkg.com',
          'https://maxcdn.bootstrapcdn.com',
        ],
        fontSrc: [
          "'self'",
          'https://fonts.gstatic.com',
          'https://ka-f.fontawesome.com',
          'https://maxcdn.bootstrapcdn.com',
        ],
        imgSrc: [
          "'self'",
          'data:',
          'https://res.cloudinary.com',
          'https://unpkg.com',
        ],
        connectSrc: [
          "'self'",
          'https://ka-f.fontawesome.com',
          'https://cdn.jsdelivr.net',
          'https://unpkg.com',
        ],
        frameSrc: ["'self'", 'https://unpkg.com'],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'same-origin' },
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
    expectCt: {
      maxAge: 86400,
      enforce: true,
    },
  })(_req, res, next);
}
