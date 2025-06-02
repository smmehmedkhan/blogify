/**
 * Toast middleware
 * Extracts flash messages and adds them to res.locals for templates
 */
export default function toastMiddleware(req, res, next) {
  res.locals.toast = {
    success: req.flash('success') || null,
    error: req.flash('error') || null,
    warning: req.flash('warning') || null,
    info: req.flash('info') || null,
  };

  next();
}
