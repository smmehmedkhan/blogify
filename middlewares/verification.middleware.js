export default function verification(req, res, next) {
  // Skip if user isn't signed in
  if (!req.user) {
    return next();
  }

  // Check if email is verified - using the correct property name from the model
  if (!req.user.verified) {
    // Store original URL for redirecting
    req.session.returnTo = req.originalUrl;

    // Flash message about verification requirement
    req.flash(
      'warning',
      'Please verify your email address to access this feature',
    );

    // Redirect to verification page
    return res.redirect('/auth/verify');
  }

  next();
}
