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
          'https://cdn.tiny.cloud',
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
          'https://ka-f.fontawesome.com',
          'https://cdn.jsdelivr.net',
          'https://cdn.tiny.cloud',
        ],
        fontSrc: [
          "'self'",
          'https://fonts.gstatic.com',
          'https://ka-f.fontawesome.com',
        ],
        imgSrc: [
          "'self'",
          'data:',
          'https://sp.tinymce.com',
          'https://res.cloudinary.com',
          'https://cdn.tiny.cloud',
        ],
        connectSrc: [
          "'self'",
          'https://ka-f.fontawesome.com',
          'https://cdn.jsdelivr.net',
          'https://cdn.tiny.cloud',
        ],
        frameSrc: ["'self'", 'https://cdn.tiny.cloud'],
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
