export default function emailVerification(req, res, next) {

  if (!req.user) return next();

  if (req.originalUrl.startsWith('/auth/verify')) return next();

  if (!req.user.verified) {
    req.session.returnTo = req.originalUrl; // Store prev req path in a var

    req.flash(
      'warning',
      'Please verify your email address to access this feature',
    );
    
    return res.redirect('/auth/verify');
  }

  return next();
}
