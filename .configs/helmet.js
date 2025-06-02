/**
 * Helmet configuration
 */
const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
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
      ],
      connectSrc: ["'self'", 'https://ka-f.fontawesome.com'],
    },
  },
};

export default helmetConfig;
